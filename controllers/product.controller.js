'use strict';
const Product = require('../models/Product');
const { ObjectId } = require('mongodb');

// get all products
const getAllProducts = async (request, h) => {
    try {
        const products = await Product.find();
        return h.response(products).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

//add a new product
const addProduct = async (request, h) => {
    try {
        const newProduct = new Product(request.payload);
        const saved = await newProduct.save();
        return h.response(saved).code(201);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};


//delete product by id
const deleteProduct = async (request, h) => {
    try {
        const deleted = await Product.findByIdAndDelete(request.params.id);
        if (!deleted) {
            return h.response({ error: 'Product not found' }).code(404);
        }
        return h.response(deleted).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
}


//get product by id
const getProductById = async (request, h) => {
    try {
        const book = await Product.findById(request.params.id);
        if (!product) {
            return h.response({ error: 'Product not found' }).code(404);
        }
        return h.response(product).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
}

const updateProduct = async (request, h) => {
    const { id } = request.params; // get product ID from URL
    const updates = request.payload; // fields to update

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
        return h.response({ error: 'Invalid product ID' }).code(400);
    }

    // Prevent updating _id
    if (updates._id) delete updates._id;

    try {
        const result = await request.mongo.db.collection('products').updateOne(
            { _id: ObjectId(id) },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return h.response({ error: 'Product not found' }).code(404);
        }

        return h.response({ message: 'Product updated', updatedFields: updates }).code(200);

    } catch (err) {
        console.error(err);
        return h.response({ error: 'Failed to update product' }).code(500);
    }
};
const changeStock = async (request, h) => {
    const { id } = request.params;
    const { stockChange } = request.payload; 

    const result = await request.mongo.db.collection('products').updateOne(
        { _id: new ObjectId(id) },
        { $inc: { stock: stockChange } }
    );

    if (result.matchedCount === 0) {
        return h.response({ message: "Product not found" }).code(404);
    }

    return { message: `Stock updated by ${stockChange}` };
};

//export functions
module.exports = {
    changeStock,
    getAllProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById
};