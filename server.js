'use strict';

require('dotenv').config();
const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['http://localhost:5173', 'https://your-netlify-app.netlify.app'],
        credentials: false // using JWT in localStorage, no cookies needed
      }
    }
  });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Database connection error:", err));

  // Register all routes
  routes(server);

  // Test route
  server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Server is up and running!'
  });

  await server.start();
  console.log('Server running on', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

init();
