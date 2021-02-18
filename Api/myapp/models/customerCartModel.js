const orderItemModel = require('./orderItemModel');
const mongoose = require('mongoose');

const CustomerCartSchema = new mongoose.Schema({
    cartId: { type: String, unique: true},
    orderIds: [{ type: mongoose.Schema.Types.ObjectId , ref:"OrderItem", required: true}],
    totalPrice: { type: Number },
    approved:{ type: Boolean, default: false},
    cusName:{ type: String, required: true},
    cusAddress: { type:String, required: true},
    cusPhone: { type:String, required: true, min:10},
    cusEmail:{ type:String, required:true}
});

module.exports = mongoose.model('CustomerCart', CustomerCartSchema);

