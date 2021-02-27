require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());


var userRoutes = require("./routes/user");
var productRoutes = require("./routes/product");
var orderRoutes = require("./routes/order");
var cartRoutes = require("./routes/customerCart");

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

//Mongoose connection
//mongoose.connect("mongodb://localhost:27017/database");

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// mongoose.connection.on('connected', function(){
//   console.log("MONGOOOSE CONNNEEECTEEEEDDD");
//   console.log(process.env.NODE_ENV);
//   console.log(process.env.JWT_KEY);
// })

app.use(express.static('photos'))
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "500mb" }));

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("api/admin", userRoutes);
app.use("api/products", productRoutes);
app.use("api/orders", orderRoutes.router);
app.use("api/carts", cartRoutes);

if(process.env.NODE_ENV === "production"){
  // app.use(express.static(path.join(__dirname, '/Client/build')));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'Client', 'build', 'index.js'))
  // })
}else{
  app.get('/', (req, res) => {
    res.send("Api is running")
  })
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message,
    },
  });
});





module.exports = app;
