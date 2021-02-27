const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
        productId: { type: String, required: true, unique: true },
        productName: { type: String, required: true, unique: true},
        productImage: [{ type: String, required: true }],
        availability: { type: Boolean, required: true },
        type: { type: String, required: true },
        details:{ type: String, required: true },
        options: [{
            name: { type: String },
            price: { type: Number }
        }],
        preferences: [{ type: String }],
        bundleItems: { type: Boolean },
        tags: [{ type: String }]
    }
);

module.exports = new mongoose.model('Product', ProductSchema);