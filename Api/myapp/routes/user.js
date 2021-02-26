var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const authenticate = require('../middleware/authentication');

/* GET users listing. */
router.get("/", authenticate, function (req, res, next) {
  User.find()
  .select('-__v -_id')
  .exec()
  .then(users => {
    if(users.length === 0){
      res.status(404).json()
    }else{
      res.status(200).json({
        users
      })
    }
  })
});

router.post("/signup", (req, res, next) => {
  const users = User.find().exec().then(users => users);

  if(users.length >= 1){
    res.status(409).json({
      message: "Admin already exists"
    })
  }else{
    User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Admin already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              err,
            });
          } else {
            const user = new User({
              userId: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "Admin created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  err,
                });
              });
          }
        });
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length <= 0) {
        return res.status(404).json({
          message: "Login failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Login failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0].userId,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "24h",
            }
          );
          return res.status(200).json({
            message: "Login successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Login failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:username", authenticate,(req, res, next) => {
  User.deleteOne({ username: req.params.username })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Admin deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err,
      });
    });
});

module.exports = router;
