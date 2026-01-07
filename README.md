# Product Management API

A RESTful API built for managing products and categories, providing comprehensive CRUD operations and inventory management capabilities.

## Features

- Complete product management (Create, Read, Update, Delete)
- Category browsing and retrieval
- Stock management with dedicated endpoint
- RESTful API design with standard HTTP methods

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Retrieve all products |
| GET | `/products/{id}` | Get a specific product by ID |
| POST | `/products` | Create a new product |
| PATCH | `/products/{id}` | Partially update a product |
| DELETE | `/products/{id}` | Delete a product |
| PATCH | `/products/{id}/stock` | Update product stock levels |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Retrieve all categories |
| GET | `/categories/{id}` | Get a specific category by ID |

## Getting Started


### Installation


The API will be available at `http://localhost:3000` (or your configured port).


Getting started:

git clone 

npm install

add .env (MONGO_URI, PORT)

npm run start
