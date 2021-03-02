const orderItemModel = require('./orderItemModel');
const mongoose = require('mongoose');

const CustomerCartSchema = new mongoose.Schema({
    cartId: { type: String, unique: true},
    orderIds: [{ type: mongoose.Schema.Types.ObjectId , ref:"OrderItem", required: true}],
    totalPrice: { type: Number },
    status:{ type: String, default:"Awaiting Confirmation"},
    cusName:{ type: String, required: true},
    cusAddress: { type:String, required: true},
    cusPhone: { type:String, required: true, min:10, max:10},
    cusEmail:{ type:String, 
                required:true, 
                match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            },
    cusReview: {
            rating:{type: Number, min:0, max: 5},
            review:{type: String}        
    },
    cusCheckId: { type: String, required: true, unique:true},
    orderDate: {type: Date, default:Date.now }
});

module.exports = mongoose.model('CustomerCart', CustomerCartSchema);

