'use strict';

const { 
  getAllProducts, changeStock, addProduct, deleteProduct, updateProduct, getProductById 
} = require('./controllers/product.controller');

const { 
  getAllCategories, getCategoryByName, addCategory, updateCategory, deleteCategory 
} = require('./controllers/category.controller');

const { 
  addUser, loginUser, deleteUser, getAllUsers, getUserById, updateUser 
} = require('./controllers/user.controller');

const auth = require('./middlewares/authentication');

const routeCors = {
  origin: ['http://localhost:5173', 'https://your-netlify-app.netlify.app'],
  additionalHeaders: ['content-type', 'authorization'],
};

module.exports = (server) => {

  // ---------------- USERS ----------------

  // Public login route
  server.route({
    method: ['POST', 'OPTIONS'],
    path: '/users/login',
    options: { cors: routeCors },
    handler: loginUser
  });

  // Add user (protected)
  server.route({
    method: 'POST',
    path: '/users',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: addUser
  });

  // Delete user (protected)
  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: deleteUser
  });

  // Get all users (protected)
  server.route({
    method: 'GET',
    path: '/users',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: getAllUsers
  });

  // Get user by id (protected)
  server.route({
    method: 'GET',
    path: '/users/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: getUserById
  });

  // Update user (protected)
  server.route({
    method: 'PATCH',
    path: '/users/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: updateUser
  });

  // ---------------- PRODUCTS ----------------

  // Get all products (public)
  server.route({
    method: 'GET',
    path: '/products',
    options: { cors: routeCors },
    handler: getAllProducts
  });

  // Add product (protected)
  server.route({
    method: 'POST',
    path: '/products',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: addProduct
  });

  // Delete product (protected)
  server.route({
    method: 'DELETE',
    path: '/products/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: deleteProduct
  });

  // Get product by id (public)
  server.route({
    method: 'GET',
    path: '/products/{id}',
    options: { cors: routeCors },
    handler: getProductById
  });

  // Update product (protected)
  server.route({
    method: 'PATCH',
    path: '/products/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: updateProduct
  });

  // Change product stock (protected)
  server.route({
    method: 'PATCH',
    path: '/products/{id}/stock',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: changeStock
  });

  // ---------------- CATEGORIES ----------------

  // Get all categories (public)
  server.route({
    method: 'GET',
    path: '/categories',
    options: { cors: routeCors },
    handler: getAllCategories
  });

  // Get category by name (public)
  server.route({
    method: 'GET',
    path: '/categories/{category}',
    options: { cors: routeCors },
    handler: getCategoryByName
  });

  // Add category (protected)
  server.route({
    method: 'POST',
    path: '/categories',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: addCategory
  });

  // Update category (protected)
  server.route({
    method: 'PATCH',
    path: '/categories/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: updateCategory
  });

  // Delete category (protected)
  server.route({
    method: 'DELETE',
    path: '/categories/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: deleteCategory
  });
};
