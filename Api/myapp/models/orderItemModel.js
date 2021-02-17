const mongoose = require('mongoose');


const OrderItemSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    productId: { type: String, required: true },
    // productObjectId: { type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true },
    totalPrice:{ type: Number, required: true },
    quantity: { type: Number, required: true },
    selectedPreference: { type: String, required: true },
    selectedOption: { type: String, required: true }
});

module.exports = new mongoose.model('OrderItem', OrderItemSchema);
