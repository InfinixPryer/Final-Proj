const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/orderItemModel');
const Product = require('../models/productModel');
const Cart = require('../models/customerCartModel');
const PostOrder = require('../routes/order')
const authenticate = require('../middleware/authentication');

router.get('/' ,(req, res, next) => {
    Cart.find()
    .select('-__v -_id')
    .exec()
    .then(carts => {
        if(carts.length === 0){
            return res.status(404).json({
                message:"No carts found."
            })
        }
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

router.get('/:cartId', (req, res, next) => {
    Cart.find({cartId: req.params.cartId})
    .select('-__v -_id')
    .exec()
    .then(cart => {
        if(cart.length <= 0){
            next();
        }else{
            res.status(200).json({
                cart
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error
        })
    })
})

router.get('/:cusCheckId', (req, res, next) => {
    Cart.find({cusCheckId: req.params.cusCheckId})
    .select('-__v -_id')
    .exec()
    .then(cart => {
        if(cart.length === 0){
            res.status(404).json({
                message:'Cart is not found.'
            })
        }else{
            return res.status(200).json({
                cart
            })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error
        })
    })
})

router.get('/reviews' ,(req, res, next) => {
    Cart.find()
    .select('cusReview -_id')
    .exec()
    .then(reviews => {
        if(reviews.length === 0){
            res.status(404).json({
                message:"No customer reviews"
            })
        }
        res.status(200).json({
            reviews
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
});

const generateId = () => {
    const ranString = Math.random().toString(36).substr(2, 4);
    const ranNumber = Math.floor(Math.random()*999);

    return ranString + ranNumber;
}


router.post('/', (req, res, next) => {
    
    const checkId = generateId();
    Cart.find()
    .select('cusCheckId')
    .then(chkId => {
        var x = false;
        var count = 3;
        do{
            chkId.map(id => {
                if(checkId == id){
                    checkId = generateId();
                    count++;
                }else{
                    count--;
                    x = true;
                }
            })
        }while(x == false && count !=0)
    })
    .catch(err => {
        return res.sendStatus(500).json({
            err
        })
    })
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
                    cusEmail: req.body.cusEmail,
                    cusCheckId: checkId
                })
                return newCart.save()
            })
            .then(result => {
                res.status(201).json({
                    message: 'Successfully created cart',
                    createdCart: {
                        cartId: result.cartId,
                        totalPrice: result.totalPrice,
                        approved: result.approved,
                        orderIds: result.orderIds,
                        cusName: result.cusName,
                        cusAddress: result.cusAddress,
                        cusPhone: result.cusPhone,
                        cusEmail: result.cusEmail,
                        cusCheckId: result.cusCheckId,
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

router.delete('/:cartId'/*, authenticate*/, (req, res, next) => {
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

router.patch('/:cartId/feedback'/*, authenticate*/, (req, res) => {
    const id = req.params.cartId
    const updateBody = req.body
    Cart.find({cartId: id})
    .then(cart => {
        if(cart.length === 0)
        {
            res.status(404).json({
                message: 'Cart not found'
            })
        }
        Cart.updateOne({cartId: req.params.cartId}, {$set: updateBody})
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