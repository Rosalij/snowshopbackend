'use strict';

require ('dotenv').config();
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const routes = require('./routes'); 

//initialize server
const init = async () => {
const server = Hapi.server({
  port: process.env.PORT || 5000,
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'], // allowed origins
      additionalHeaders: ['cache-control', 'x-requested-with', 'authorization', 'content-type'],
      credentials: true
  }     
    }
});

    

    //connect to database
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Database connection error: ", err);    
});


routes(server); 
//test route
server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return 'The server is up and running!';
    }

});
//start server
    await server.start();
    console.log('Server running on', server.info.uri);
};
//handle unhandled rejections
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
