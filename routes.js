'use strict';

const { getAllProducts, changeStock, addProduct, deleteProduct, updateProduct, getProductById } = require('./controllers/product.controller');
const { getAllCategories, getCategoryById, deleteCategory, addCategory, updateCategory } = require('./controllers/category.controller');
const { addUser, loginUser, deleteUser, getAllUsers, getUserById, updateUser } = require('./controllers/user.controller');
const auth = require('./middlewares/authentication');

module.exports = (server) => {

    //get all products
    server.route({
        method: 'GET',
        path: '/products',
        handler: getAllProducts
    });

    //add product
    server.route({
        method: 'POST',
        path: '/products',
        options: {
            pre: [{ method: auth }]
        },
        handler: addProduct
    });

    //delete product
    server.route({
        method: 'DELETE',
        path: '/products/{id}',
        options: {
            pre: [{ method: auth }]
        },
        handler: deleteProduct
    });

    //get product by id
    server.route({
        method: 'GET',
        path: '/products/{id}',
        handler: getProductById
    });

    //update product
    server.route({
        method: 'PATCH',
        path: '/products/{id}',
        options: {
            pre: [{ method: auth }]
        },
        handler: updateProduct
    });

    // categories routes
    server.route({
        method: 'GET',
        path: '/categories',
        handler: getAllCategories
    });

    server.route({
        method: 'GET',
        path: '/categories/{id}',
        handler: getCategoryById
    });

    server.route({
        method: 'DELETE',
        path: '/categories/{id}',
        options: {
            pre: [{ method: auth }]
        },
        handler: deleteCategory
    });

    server.route({
        method: 'POST',
        path: '/categories',
        options: {
            pre: [{ method: auth }]
        },
        handler: addCategory
    });

    server.route({
        method: 'PATCH',
        path: '/categories/{id}',
        options: {
            pre: [{ method: auth }]
        },
        handler: updateCategory
    });

    //change stock route
    server.route({
        method: 'PATCH',
        path: '/products/{id}/stock',
        options: {
            pre: [{ method: auth }]
        },
        handler: changeStock
    });

    //add user route
    server.route({
        method: 'POST',
        path: '/users',
        options: {
            pre: [{ method: auth }]
        },
        handler: addUser
    });

    //user login route
    server.route({
        method: 'POST',
        path: '/users/login',
        handler: loginUser
    });

    //delete user route
    server.route({
        method: 'DELETE',
        path: '/users/{id}',
        options: {
            pre: [{ method: auth }]
        },
        handler: deleteUser
    });

    //get all users route
    server.route({
        method: 'GET',
        path: '/users',
        options: {
            pre: [{ method: auth }]
        },
        handler: getAllUsers
    });

    //get user by id route
    server.route({
        method: 'GET',
        path: '/users/{id}',
        options: {
            pre: [{ method: auth }]
        },
        handler: getUserById
    });

    //update user route
    server.route({
        method: 'PATCH',
        path: '/users/{id}',
        options: {
            pre: [{ method: auth }]
        },
        handler: updateUser
    });
}
