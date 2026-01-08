'use strict';

const { getAllProducts, changeStock, addProduct, deleteProduct, updateProduct, getProductById } = require('./controllers/product.controller');
const { getAllCategories, getCategoryById, deleteCategory, addCategory, updateCategory} = require('./controllers/category.controller');
const { addUser, loginUser, deleteUser, getAllUsers, getUserById, updateUser } = require('./controllers/user.controller');
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
        handler: addProduct
    });

    //delete product
    server.route({
        method: 'DELETE',
        path: '/products/{id}',
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
        handler: deleteCategory
    });

    server.route({
        method: 'POST', 
        path: '/categories',
        handler: addCategory
    });

    server.route({
        method: 'PATCH',
        path: '/categories/{id}',
        handler: updateCategory
    });

    //change stock route
    server.route({
        method: 'PATCH',
        path: '/products/{id}/stock',
        handler: changeStock
    });

    //add user route
    server.route({
        method: 'POST',
        path: '/users',
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
        handler: deleteUser
    });

    //get all users route
    server.route({
        method: 'GET',
        path: '/users',
        handler: getAllUsers
    });

    //get user by id route
    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: getUserById
    });

    //update user route
    server.route({
        method: 'PATCH',
        path: '/users/{id}',
        handler: updateUser
    });
}
