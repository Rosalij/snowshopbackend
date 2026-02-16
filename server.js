'use strict';

require('dotenv').config();
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const routes = require('./routes');

const init = async () => {

  // 1️⃣ Create Hapi server
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['http://localhost:5173', 'https://snowshopfrontend.netlify.app'],
        credentials: false
      }
    }
  });

  // 2️⃣ Handle OPTIONS preflight for login route
  server.route({
    method: 'OPTIONS',
    path: '/users/login',
    handler: (request, h) => h.response().code(200),
    options: {
      cors: {
        origin: ['http://localhost:5173', 'https://snowshopfrontend.netlify.app'],
      }
    }
  });

  // 3️⃣ Optional: global OPTIONS handler for any other preflight
  server.route({
    method: "OPTIONS",
    path: "/{any*}",
    handler: (request, h) => h.response().code(200),
    options: { cors: true }
  });

  // 4️⃣ Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Database connection error:", err));

  // 5️⃣ Register all other routes
  routes(server);

  // 6️⃣ Test route
  server.route({
    method: 'GET',
    path: '/',
    handler: () => 'The server is up and running!'
  });

  // 7️⃣ Start server
  await server.start();
  console.log("Server running on", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
