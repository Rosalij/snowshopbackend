'use strict';

require ('dotenv').config();
const Hapi = require('@hapi/hapi');
const mongoose = require("mongoose");
const routes = require('./routes'); 

//initialize server
const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: 'localhost',
     routes: {
  cors: {
    origin: ["*"]
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
        return 'Hello, world!!!';
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
