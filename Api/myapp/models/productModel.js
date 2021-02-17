const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
        product_id: { type: String, required: true, unique: true },
        productName: { type: String, required: true },
        type: { type: String, required: true },
        productImage: { type: String, required: false },
        availability: { type: Boolean, required: true },
        price: { type: Number, required: true },
        details:{ type: String, required: true },
        options: [{
            name: { type: String },
            price: { type: Number }
        }],
        preferences: {
            whole: Boolean,
            ground: Boolean,
        },
        bundelItems: { type: Boolean },
        tags: { type: Array }
    }
);

module.exports = new mongoose.model('Product', ProductSchema);