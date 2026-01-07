# A simple RESTful API to manage products using Hapi.js and MongoDB.
## This web service allows users to create, read, update, and delete products. 
It uses Hapi.js as the server framework and MongoDB with Mongoose for data storage.

| Endpoint         | Method | Description                         |
| ---------------- | ------ | ----------------------------------- |
| `/products`      | GET    | Retrieve all products              |
| `/products`      | POST   | Add a new product                  |
| `/products/{id}` | GET    | Retrieve a single product          |
| `/products/{id}` | PUT    | Update a product                   |
| `/products/{id}` | DELETE | Delete a product                   |
| `/`           | GET    | Test route, returns "Hello, world!" |








Getting started:

git clone 

npm install

add .env (MONGO_URI, PORT)

npm run start
