'use strict';

const { 
  getAllProducts, changeStock, addProduct, deleteProduct, updateProduct, getProductById 
} = require('./controllers/product.controller');
const { 
  getAllCategories, getCategoryByName, deleteCategory, addCategory, updateCategory 
} = require('./controllers/category.controller');
const { 
  addUser, loginUser, deleteUser, getAllUsers, getUserById, updateUser 
} = require('./controllers/user.controller');
const auth = require('./middlewares/authentication');

module.exports = (server) => {

  // Global CORS for all routes (React frontend)
  const routeCors = {
    origin: ['http://localhost:5173', 'https://snowshopadmin.netlify.app'],
    additionalHeaders: ['content-type', 'authorization'],
  };

  // ===== PRODUCTS =====
  server.route({
    method: 'GET',
    path: '/products',
    options: { cors: routeCors },
    handler: getAllProducts
  });

  server.route({
    method: 'POST',
    path: '/products',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: addProduct
  });

  server.route({
    method: 'DELETE',
    path: '/products/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: deleteProduct
  });

  server.route({
    method: 'GET',
    path: '/products/{id}',
    options: { cors: routeCors },
    handler: getProductById
  });

  server.route({
    method: 'PATCH',
    path: '/products/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: updateProduct
  });

  server.route({
    method: 'PATCH',
    path: '/products/{id}/stock',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: changeStock
  });

  // ===== CATEGORIES =====
  server.route({
    method: 'GET',
    path: '/categories',
    options: { cors: routeCors },
    handler: getAllCategories
  });

  server.route({
    method: 'GET',
    path: '/categories/{category}',
    options: { cors: routeCors },
    handler: getCategoryByName
  });

  server.route({
    method: 'POST',
    path: '/categories',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: addCategory
  });

  server.route({
    method: 'PATCH',
    path: '/categories/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: updateCategory
  });

  server.route({
    method: 'DELETE',
    path: '/categories/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: deleteCategory
  });

  // ===== USERS =====
  server.route({
    method: 'POST',
    path: '/users',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: addUser
  });

  // LOGIN ROUTE (important: allow CORS + Content-Type)
  server.route({
    method: 'POST',
    path: '/users/login',
    options: { cors: routeCors },
    handler: loginUser
  });

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: deleteUser
  });

  server.route({
    method: 'GET',
    path: '/users',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: getAllUsers
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: getUserById
  });

  server.route({
    method: 'PATCH',
    path: '/users/{id}',
    options: { pre: [{ method: auth }], cors: routeCors },
    handler: updateUser
  });

};
