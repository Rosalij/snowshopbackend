const mongoose = require("mongoose");

//define category schema
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Category', categorySchema);