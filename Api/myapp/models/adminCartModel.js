const customerCartModel = require('./customerCartModel');
const mongoose = require('mongoose');

const AdminCartSchema = new mongoose.Schema({
    customerCartModel: {type: customerCartModel , required: true}
});

module.exports = mongoose.model('AdminCart', AdminCartSchema);