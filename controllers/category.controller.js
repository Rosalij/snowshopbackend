
const Category = require('../models/Category');
// get all categories

const getAllCategories = async (request, h) => {
    try {
        const categories = await Category.find();
        return h.response(categories).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

const getCategoryByName = async (request, h) => {
    try {
        const category = await Category.findByName(request.params.category);
        if (!category) {
            return h.response({ error: 'Category not found' }).code(404);
        }
        return h.response(category).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

const deleteCategory = async (request, h) => {
    try {
        const deleted = await Category.findByIdAndDelete(request.params.id);
        if (!deleted) {
            return h.response({ error: 'Category not found' }).code(404);
        }
        return h.response(deleted).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

const addCategory = async (request, h) => {
    try {
        const newCategory = new Category(request.payload);
        const saved = await newCategory.save();
        return h.response(saved).code(201);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

const updateCategory = async (request, h) => {
    try {
        const updated = await Category.findByIdAndUpdate(
            request.params.id,
            request.payload,
            { new: true }
        );
        if (!updated) {
            return h.response({ error: 'Category not found' }).code(404);
        }
        return h.response(updated).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};





//export functions
module.exports = {
        getAllCategories,
        getCategoryByName,
        deleteCategory,
        addCategory,
        updateCategory
    };