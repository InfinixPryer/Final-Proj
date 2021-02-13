const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
    });

const Product = require('../models/productModel');

router.get('/', (req, res, next) => {
    Product.find()
    .select('_id productName price productImage availability')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return{
                    productId: doc._id,
                    productName: doc.productName,
                    price: doc.price,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET'
                    }
                }
            })
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
    Product.findById(id)
    .select('_id productName price productImage availability')
    .exec()
    .then( doc => {
        if(doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET'
                }
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            error:err
        })
    })
})

router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        id: req.body.id,
        productName: req.body.productName,
        productImage: req.file.path,
        availability: req.body.availability,
        price: req.body.price,
    });
    product.save()
    .then(result => {
        res.status(201).json({
            message: "Product saved successfully!",
            createdProduct:{
                _id: result._id,
                productName: result.productName,
                price: result.price   
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
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id:id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    });
});

//TEST: Deletes a single product using productID
router.delete('/:productId', (req, res, next)=>{
    const id = req.params.productId;
    Product.deleteOne({_id: id})
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