const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orderItemModel');
const Product = require('../models/productModel');

router.get('/', (req, res, next) => {
    Order.find()
    .select('-__v -_id')
    // .populate('productObjectId')
    .exec()
    .then(orders => {
        res.status(200).json({
            count: orders.length,
            orders
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
    Product.find({ productId: req.body.productId })
    .select()
    .exec()
    .then(product => {
        if(product.length === 0){
            return res.status(404).json({
                message: 'Product not found.'
            });
        }
        const newId = new mongoose.Types.ObjectId();
        const order = new Order({
            _id: newId,
            orderId: newId,
            quantity : req.body.quantity,
            productId: req.body.productId,
            // productObjectId: product[0]._id,
            selectedPreference: req.body.selectedPreference,
            selectedOption: req.body.selectedOption,
            totalPrice: req.body.totalPrice
        })
        return order.save();
    })
    .then(result => {
        res.status(201).json({
            orderId: result.orderId,
            quantity: result.quantity,
            productId: result.productId,
            selectedPreference: result.selectedPreference,
            selectedOption: result.selectedOption,
            totalPrice: result.totalPrice
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:orderId', (req, res, next) => {
    Order.find({orderId: req.params.orderId})
    .select('-__v -_id')
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
    Order.deleteOne({orderId:req.params.orderId})
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

router.delete('/', (req, res, next) => {
    Order.deleteMany()
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order Deleted',
            result: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
});

module.exports = router;