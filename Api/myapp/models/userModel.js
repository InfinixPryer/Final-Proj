const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true, 
        unique: true,
        match: /^[a-zA-Z0-9]+$/
    },
    password: { type: String, required: true}
});

module.exports = new mongoose.model('User', UserSchema);
