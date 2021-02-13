const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
        productId: mongoose.Schema.Types.ObjectId,
        productName: { type: String, required: true},
        type: {type: String, required: false},
        productImage: { type: String, required: false},
        availability: {type:Boolean, required: false},
        price: { type: Number, required: true},
        details:{type:String, required: false},
        options:{
            
        },
        preferences: {
            whole: String,
            ground: String,
        },
        bundelItems: {type: Boolean},
        tags: { type: Array}
    }
);

module.exports = new mongoose.model('Product', ProductSchema);