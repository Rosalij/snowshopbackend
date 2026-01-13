require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

async function seedProducts() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Fetch categories to get their ObjectId
  const snowboards = await Category.findOne({ slug: 'snowboards' });
  const bindings = await Category.findOne({ slug: 'bindings' });
  const helmets = await Category.findOne({ slug: 'helmets' });
  const accessories = await Category.findOne({ slug: 'accessories' });
  const apparel = await Category.findOne({ slug: 'apparel' });

  const products = [
    // Snowboards
    { name: "Burton Custom", description: "All‑mountain versatile snowboard perfect for riders at every level.", price: 599.99, stock: 8, category: snowboards._id, size: 156, color: "Black/Gray", level: "Intermediate" },
    { name: "Burton Process", description: "Freestyle‑oriented snowboard built for park performance and fun.", price: 629.99, stock: 6, category: snowboards._id, size: 154, color: "Red/White", level: "Intermediate" },
    { name: "Lib Tech T.Rice Pro", description: "High‑end board designed with Travis Rice for versatile terrain riding.", price: 729.99, stock: 5, category: snowboards._id, size: 159, color: "Green/Blue", level: "Advanced" },
    { name: "Salomon Assassin", description: "All‑mountain/freestyle hybrid board with smooth ride and pop.", price: 649.99, stock: 7, category: snowboards._id, size: 157, color: "Blue/Black", level: "Intermediate" },
    { name: "Rome Ravine Pro", description: "Freeride focused snowboard with powerful edge and stability.", price: 699.99, stock: 4, category: snowboards._id, size: 158, color: "Dark Grey/Yellow", level: "Advanced" },

    // Bindings
    { name: "Burton Cartel EST", description: "Responsive bindings designed for all‑mountain performance.", price: 229.99, stock: 10, category: bindings._id, size: "M", color: "Black", level: "Intermediate" },
    { name: "Union Force", description: "Durable bindings with great board feel for freestyle or all‑mountain riding.", price: 199.99, stock: 7, category: bindings._id, size: "L", color: "Red", level: "Advanced" },

    // Helmets
    { name: "Giro Ledge", description: "Lightweight and safe helmet for all levels of riding.", price: 129.99, stock: 15, category: helmets._id, size: "M", color: "Black", level: "All Levels" },
    { name: "Smith Holt", description: "Durable helmet with ventilation and comfort features.", price: 149.99, stock: 10, category: helmets._id, size: "L", color: "Blue", level: "All Levels" },

    // Accessories
    { name: "Dakine Wrist Guard", description: "Protective wrist guards for park and freeride safety.", price: 39.99, stock: 20, category: accessories._id, size: "One Size", color: "Black", level: "All Levels" },
    { name: "Oakley Snow Goggles", description: "High-performance goggles for clear vision in all conditions.", price: 149.99, stock: 12, category: accessories._id, size: "One Size", color: "White/Red", level: "All Levels" },

    // Apparel
    { name: "The North Face Freedom Jacket", description: "Waterproof and breathable jacket for snowboarding comfort.", price: 249.99, stock: 8, category: apparel._id, size: "M", color: "Blue", level: "All Levels" },
    { name: "Burton AK GORE-TEX Pants", description: "Durable snowboard pants for freeride or all-mountain terrain.", price: 219.99, stock: 6, category: apparel._id, size: "L", color: "Black", level: "All Levels" },
  ];

  // Clear existing products
  await Product.deleteMany({});
  const result = await Product.insertMany(products);
  console.log(`Inserted ${result.length} products into the database!`);

  await mongoose.connection.close();
}

seedProducts().catch(console.error);
