const mongoose = require("mongoose");

//define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['staff', 'admin'],
        default: 'admin'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});





module.exports = mongoose.model('User', userSchema);