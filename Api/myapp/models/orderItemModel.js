const mongoose = require('mongoose');


const OrderItemSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product' , required: true},
    totalPrice:{type:Number},
    quantity: {type: Number}
});

module.exports = new mongoose.model('OrderItem', OrderItemSchema);
