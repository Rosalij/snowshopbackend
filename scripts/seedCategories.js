require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Category.deleteMany({});

    await Category.insertMany([
      { name: 'Snowboards', slug: 'snowboards' },
      { name: 'Bindings', slug: 'bindings' },
      { name: 'Helmets', slug: 'helmets' },
      { name: 'Accessories', slug: 'accessories' },
      { name: 'Apparel', slug: 'apparel' }
    ]);

    console.log('Categories seeded successfully');
  } catch (err) {
    console.error('Seeding categories failed:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedCategories();
