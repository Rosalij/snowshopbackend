const mongoose = require("mongoose");

//define product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    level: {
        type: String,
    }
});
module.exports = mongoose.model('Product', productSchema);