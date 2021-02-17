const orderItemModel = require('./orderItemModel');
const mongoose = require('mongoose');

const CustomerCartSchema = new mongoose.Schema({
    cartId: { type: String, unique: true},
    orderIds: [{ type: mongoose.Schema.Types.ObjectId , ref:"OrderItem", required: true}],
    totalPrice: { type: Number },
    approved:{ type: Boolean, default: false}
});

module.exports = mongoose.model('CustomerCart', CustomerCartSchema);

