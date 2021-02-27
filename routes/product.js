const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const multer = require('multer');

const Product = require("../models/productModel");
const authenticate = require("../middleware/authentication")

// const storage = multer.diskStorage({
//   destination: './photos/',
//   filename: function(req, file, cb){
//     cb(null, Date.now() + file.originalname);
//   }
// })

// const fileFilter = (req, file, cb) => {
//   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//     cb(null, true);
//   }else{
//     cb(null, false);
//   }
// }

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// });

router.get("/", (req, res, next) => {
  Product.find()
    .select("-__v -_id -options._id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs,
        request: {
          type: "GET",
        },
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/tags", (req, res, next) => {
  Product.find()
    .select("tags -_id")
    .exec()
    .then((productTags) => {
      var result = [];
      var tagArrays = [];
      productTags.forEach((tags) => {
        tagArrays.push(tags.tags);
      });
      tagArrays.forEach((tagArray) => {
        tagArray.forEach((tags) => {
          if (!result.includes(tags)) {
            result.push(tags);
          }
        });
      });
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    })
});

router.get("/:productName", async(req, res, next) => {
  const name = req.params.productName;
  Product.find({ productName: name })
    .select("-__v -_id -options._id")
    .exec()
    .then((doc) => {
      if(doc.length <= 0 ){
        next();
      }else{
        res.status(200).json({
          product: doc
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.find({ productId: id })
    .select("-__v -_id -options._id")
    .exec()
    .then((doc) => {
        if(doc.length === 0){
            res.status(404).json();
        }else{
          res.status(200).json({
            product: doc[0]
        });
      }
    })
    .catch((err) => {
      console.log(err);
        res.status(500).json({
        error: err,
      });
    });
});

router.post("/"/*, authenticate*/ /*upload.array("productImage", 10)*/,(req, res, next) => {
  Product.find({productId: req.body.productId})
  .exec()
  .then(product => {
    if(product.length >= 1){
      res.status(409).json({
        message: "Product Already Exists!"
      })
    }else{
      const product = new Product({
        productId: req.body.productId,
        productName: req.body.productName,
        productImage: req.body.productImage,
        availability: req.body.availability,
        type: req.body.type,
        details: req.body.details,
        options: req.body.options,
        preferences: req.body.preferences,
        bundleItems: req.body.bundleItems,
        tags: req.body.tags,
      });
      product
        .save()
        .then((result) => {
          res.status(201).json({
            message: "Product saved successfully!",
            createdProduct: {
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
              tags: req.body.tags,
            },
          });
        })
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
});

router.patch("/:productId"/*, authenticate*/, (req, res, next) => {
  const id = req.params.productId;
  const updateBody = req.body;
  Product.updateOne({ productId: id }, { $set: updateBody })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:productId"/*, authenticate*/, (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ productId: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
