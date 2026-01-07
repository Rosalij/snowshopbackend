
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

const getCategoryById = async (request, h) => {
    try {
        const category = await Category.findById(request.params.id);
        if (!category) {
            return h.response({ error: 'Category not found' }).code(404);
        }
        return h.response(category).code(200);
    } catch (err) {
        return h.response({ error: err.message }).code(500);
    }
};

//export functions
module.exports = {
        getAllCategories,
        getCategoryById
    };