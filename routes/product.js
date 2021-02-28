const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');
const {getFile, postFile, deleteFile } = require("../service/boxService");

const Product = require("../models/productModel");
const authenticate = require("../middleware/authentication")

const storage = multer.diskStorage({
  destination: './photos/',
  filename: function(req, file, cb){
    cb(null, Date.now() + file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

router.get("/", (req, res, next) => {
  Product.find()
    .select("-__v -_id -options._id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs
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

router.get("/image/:imageId", (req, res, next) => {
  getFile(req.params.imageId)
    .then(image => {
      res.setHeader('Content-Type', 'image/jpeg');
      image.on('data', (data) => {
        res.write(Buffer.concat([data]));
      });
      image.on('error', () => res.end());
      image.on('end', () => res.end());
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({ err });
    });
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

router.post("/"/*, authenticate*/ ,upload.array("productImage", 10),(req, res, next) => {
  console.log(req.body);
  console.log(req.files)
  Product.find({productId: req.body.productId})
  .exec()
  .then(product => {
    if(product.length >= 1){
      res.status(409).json({
        message: "Product Already Exists!"
      })
    } else {
      Promise.all(req.files.map(f => postFile(f.filename, fs.createReadStream(f.path))))
        .then((uploadedIds) => {
          req.files.map(f => fs.unlink(f.path, () => {}));
          const product = new Product({
            productId: req.body.productId,
            productName: req.body.productName,
            // productImage: [...req.files.map(f => f.filename)],
            productImage: [...uploadedIds],
            availability: req.body.availability,
            type: req.body.type,
            details: req.body.details,
            options: JSON.parse(req.body.options),
            preferences: JSON.parse(req.body.preferences),
            bundleItems: req.body.bundleItems,
            tags: JSON.parse(req.body.tags),
          });
          return product.save();
        })
        .then((result) => {
          res.status(201).json({
            message: "Product saved successfully!",
            createdProduct: {
              productId: result.productId,
              productName: result.productName,
              price: result.price,
              productImage: result.productImage,
              availability: result.availability,
              type: result.type,
              details: result.details,
              options: result.options,
              preferences: result.preferences,
              bundleItems: result.bundleItems,
              tags: result.tags,
            },
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({
            error: err.message,
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
  Product.find({productId: id})
  .select('productImage')
  .exec()
  .then(result => {
    result[0].productImage.map(img => {
      console.log(img);
      fs.unlinkSync(img);
    })
  })
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