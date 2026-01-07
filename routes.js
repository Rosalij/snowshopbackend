'use strict';

const { getAllProducts, changeStock, addProduct, deleteProduct, updateProduct, getProductById } = require('./controllers/product.controller');
const { getAllCategories, getCategoryById } = require('./controllers/category.controller');
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

    //update product
    server.route({
        method: 'PUT',
        path:   '/products/{id}',
        handler: updateProduct
    });

    //get product by id
    server.route({
        method: 'GET',
        path:   '/products/{id}',
        handler: getProductById
    });

    server.route({
        method: 'PATCH',
        path: '/products/{id}',
        handler: updateProduct
    });

    //get categories route
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
  method: 'PATCH',
  path: '/products/{id}/stock',
  handler: changeStock
});

}
