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
    cusEmail:{ type:String, 
                required:true, 
                match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            },
    orderDate: {type: Date, default:Date.now }
});

module.exports = mongoose.model('CustomerCart', CustomerCartSchema);

