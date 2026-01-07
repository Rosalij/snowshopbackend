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
        type: String,
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