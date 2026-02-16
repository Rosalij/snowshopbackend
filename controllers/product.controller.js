'use strict';
const Product = require('../models/Product');
const { ObjectId } = require('mongodb');

// get all products

const getAllProducts = async (request, h) => {
    try {
        const products = await Product.find().populate("category", "name slug"); 
      

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
// Get product by ID
const getProductById = async (request, h) => {
  try {
    const { id } = request.params;

    // Fetch the product
    const product = await Product.findById(id).populate('category'); // populate if you have categories

    if (!product) {
      return h.response({ error: 'Product not found' }).code(404);
    }

    return h.response(product).code(200);
  } catch (err) {
    console.error("Error fetching product:", err);
    return h.response({ error: err.message }).code(500);
  }
};

const updateProduct = async (request, h) => {
    const { id } = request.params; // get product ID from URL
    const updates = request.payload; // fields to update

    // Prevent updating _id
    if (updates._id) delete updates._id;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updates,
            { new: true } // return the updated document
        );

        if (!updatedProduct) {
            return h.response({ error: 'Product not found' }).code(404);
        }

        return h.response({ message: 'Product updated', product: updatedProduct }).code(200);

    } catch (err) {
        console.error('Failed to update product:', err);
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
