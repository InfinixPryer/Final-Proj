const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orderItemModel');
const Product = require('../models/productModel');

router.get('/', (req, res, next) => {
    Order.find()
    .select('_id quantity product')
    .populate('productId')
    .exec()
    .then(orders => {
        res.status(200).json({
            count: orders.length,
            orders: orders.map(order => {
                return{
                    _id: order._id,
                    quantity: order.quantity,
                    product: order.productId
                }
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            
            error: err
        })
    })
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message: 'Product not found.'
            });
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            productId: req.body.productId
        })
        return order.save();
    })
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        res.status(200).json({
            order: order
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

router.delete('/:orderId', (req, res, next) => {
    Order.deleteOne({_id:req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;