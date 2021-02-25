const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orderItemModel');
const Product = require('../models/productModel');
const Cart = require('../models/customerCartModel');
const PostOrder = require('../routes/order')

router.get('/', (req, res, next) => {
    Cart.find()
    .select('-__v -_id')
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
                    totalPrice: req.body.totalPrice,
                    cusName: req.body.cusName,
                    cusAddress: req.body.cusAddress,
                    cusPhone: req.body.cusPhone,
                    cusEmail: req.body.cusEmail
                })
                return newCart.save()
            })
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Successfully created cart',
                    createdCart: {
                        cartId: result.cartId,
                        totalPrice: result.totalPrice,
                        approved: result.approved,
                        orderIds: result.orderIds,
                        cusName: req.body.cusName,
                        cusAddress: req.body.cusAddress,
                        cusPhone: req.body.cusPhone,
                        cusEmail: req.body.cusEmail,
                        orderDate: result.orderDate
                    }
                })
            })
            .catch(err => {
                console.log(err);
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

router.patch('/:cartId/status',(req, res) => {
    Cart.find({cartId: req.params.cartId})
    .then(cart => {
        if(cart.length === 0)
        {
            res.status(404).json({
                message: 'Product not fouuuuuuuuuund.'
            })
        }
        const { approved } = req.body;
        Cart.updateOne({cartId: req.params.cartId}, {$set: { approved }})
        .exec()
        .then(result => {
            res.status(200).json({
                message:'Cart status successfully updated',
                result: result
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
});

module.exports = router;