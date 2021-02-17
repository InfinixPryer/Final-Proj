const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, './public/images/');
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
//     {
//         cb(null, true);
//     }
//     else{
//         cb(null, false);
//     }
// }

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
//     });

const Product = require('../models/productModel');

router.get('/', (req, res, next) => {
    Product.find()
    .select('-__v -_id -options._id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs,
            request: {
                type: 'GET'
            }
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.find({productId:id})
    .select('-__v -_id -options._id')
    .exec()
    .then( doc => {
        if(doc.length > 0){
            res.status(200).json({
                product: doc[0],
                request: {
                    type: 'GET'
                }
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error
        })
    })
})

router.post('/'/*, upload.single('productImage')*/, (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        productId: req.body.productId,
        productName: req.body.productName,
        price: req.body.price,
        productImage: req.body.productImage,
        availability: req.body.availability,
        type: req.body.type,
        details: req.body.details,
        options: req.body.options,
        preferences: req.body.preferences,
        bundleItems: req.body.bundleItems,
        tags: req.body.tags
    });
    product.save()
    .then(result => {
        res.status(201).json({
            message: "Product saved successfully!",
            createdProduct:{
                productId: req.body.productId,
                productName: req.body.productName,
                price: req.body.price,
                productImage: req.body.productImage,
                availability: req.body.availability,
                type: req.body.type,
                details: req.body.details,
                options: req.body.options,
                preferences: req.body.preferences,
                bundleItems: req.body.bundleItems,
                tags: req.body.tags   
            }
        });
    }).catch(err => {
        res.status(500).json({
            error:err
        });
    });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    // const updateOps = {};
    // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }
    const updateBody = req.body;
    Product.updateOne({productId:id}, {$set: updateBody})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

//TEST: Deletes a single product using productID
router.delete('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Product.deleteOne({ productId: id})
    .exec()
    .then(result => {
        res.status(200).json(result)
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;