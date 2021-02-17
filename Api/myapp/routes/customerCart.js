const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orderItemModel');
const Product = require('../models/productModel');
const Cart = require('../models/customerCartModel');
const PostOrder = require('../routes/order')

router.get('/', (req, res, next) => {
    Cart.find()
    .select('-__v')
    .exec()
    .then(carts => {
        console.log(carts);
        res.status(200).json({
            count: carts.length,
            carts
        })
    })
    .catch(error => {
        res.status(500).json({
            error: error
        })
    })
});

router.post('/', (req, res, next) => {
    Promise.all(req.body.orderItems.map((orderItem) => {
       return PostOrder.postOrder(orderItem);
    }))
        .then((orders) => {
            if (orders.filter(o => o.status === 404).length > 0) {
                return res.status(404).json({
                    message: 'One or more products not found'
                })
            }
            Promise.all(orders.map((order) => {
                return order.save()
            }))
            .then(results => {
                const newCart = new Cart({
                    cartId: new mongoose.Types.ObjectId(),
                    orderIds: results.map((result) => result.orderId),
                    totalPrice: results.totalPrice 
                })
                return newCart.save()
            })
            .then(result => {
                res.status(201).json({
                    createdCart: {
                        cartId: result.cartId,
                        orderIds: result.orderIds,
                        totalPrice: result.totalPrice
                    }
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })
});

router.delete('/:cartId', (req, res, next) => {
    Cart.find({cartId: req.params.cartId})
    .then(cart => {
        return (cart.length > 0) ? cart[0].orderIds : [];
    })
    .then(orderIds => {
        if (orderIds.length > 0) {
            Order.deleteMany({
                orderId: {$in: orderIds}
            })
            .exec();
        }
        Cart.deleteOne({cartId: req.params.cartId})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Cart Deleted',
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    })
});

module.exports = router;