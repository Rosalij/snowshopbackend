'use strict';

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const routes = require('./routes');


const init = async () => {
server.route({
  method: 'OPTIONS',
  path: '/users/login',
  handler: (request, h) => {
    return h.response().code(200);
  },
  options: {
    cors: {
      origin: ['http://localhost:5173', 'https://snowshopfrontend.netlify.app'],
      additionalHeaders: ['content-type', 'authorization'],
    }
  }
});


// ✅ MUS  T handle OPTIONS preflight
server.route({
  method: "OPTIONS",
  path: "/{any*}",
  handler: (request, h) => {
    return h.response().code(200);
  }
});


  // Connect DB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Database connection error:", err));

  // Register routes
  routes(server);

  // Test route
  server.route({
    method: 'GET',
    path: '/',
    handler: () => 'The server is up and running!'
  });

  await server.start();
  console.log("Server running on", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
