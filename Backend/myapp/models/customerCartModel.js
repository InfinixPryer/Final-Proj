const orderItemModel = require('./orderItemModel');
const mongoose = require('mongoose');

const CustomerCartSchema = new mongoose.Schema({
    customerId: mongoose.Schema.Types.ObjectId,
    orderItemModel: {type: orderItemModel , required: true},
    totalPrice: {type: Number , required: true}
});

module.exports = mongoose.model('CustomerCart', CustomerCartSchema);

