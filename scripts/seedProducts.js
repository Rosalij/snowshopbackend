require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

async function seedProducts() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db("snowshop");

const snowboardsCategory = new ObjectId("695e6539d4d71d10a71e2621");
const bindingsCategory = new ObjectId("695e6539d4d71d10a71e2622");
const bootsCategory = new ObjectId("695e6539d4d71d10a71e2623");
const accessoriesCategory = new ObjectId("695e6539d4d71d10a71e2624");
const helmetsCategory = new ObjectId("695e6539d4d71d10a71e2625");
const apparelCategory = new ObjectId("695e6539d4d71d10a71e2626");


  const products = [
  {
    name: "Burton Custom",
    description: "All‑mountain versatile snowboard perfect for riders at every level.",
    price: 599.99,
    stock: 8,
    category: snowboardsCategory,
    size: 156,
    color: "Black/Gray",
    level: "Intermediate"
  },
  {
    name: "Burton Process",
    description: "Freestyle‑oriented snowboard built for park performance and fun.",
    price: 629.99,
    stock: 6,
    category: snowboardsCategory,
    size: 154,
    color: "Red/White",
    level: "Intermediate"
  },
  {
    name: "Lib Tech T.Rice Pro",
    description: "High‑end board designed with Travis Rice for versatile terrain riding.",
    price: 729.99,
    stock: 5,
    category: snowboardsCategory,
    size: 159,
    color: "Green/Blue",
    level: "Advanced"
  },
  {
    name: "Salomon Assassin",
    description: "All‑mountain/freestyle hybrid board with smooth ride and pop.",
    price: 649.99,
    stock: 7,
    category: snowboardsCategory,
    size: 157,
    color: "Blue/Black",
    level: "Intermediate"
  },
  {
    name: "Rome Ravine Pro",
    description: "Freeride focused snowboard with powerful edge and stability.",
    price: 699.99,
    stock: 4,
    category: snowboardsCategory,
    size: 158,
    color: "Dark Grey/Yellow",
    level: "Advanced"
  },

    {
    name: "Burton Cartel EST",
    description: "Responsive bindings designed for all‑mountain performance.",
    price: 229.99,
    stock: 10,
    category: bindingsCategory,
    size: "M",
    color: "Black",
    level: "Intermediate"
  },

  {
    name: "Union Force",
    description: "Durable bindings with great board feel for freestyle or all‑mountain riding.",
    price: 199.99,
    stock: 7,
    category: bindingsCategory,
    size: "L",
    color: "Red",
    level: "Advanced"
  },
   {
    name: "Giro Ledge",
    description: "Lightweight and safe helmet for all levels of riding.",
    price: 129.99,
    stock: 15,
    category: helmetsCategory,
    size: "M",
    color: "Black",
    level: "All Levels"
  },
  {
    name: "Smith Holt",
    description: "Durable helmet with ventilation and comfort features.",
    price: 149.99,
    stock: 10,
    category: helmetsCategory,
    size: "L",
    color: "Blue",
    level: "All Levels"
  },
  {
    name: "Dakine Wrist Guard",
    description: "Protective wrist guards for park and freeride safety.",
    price: 39.99,
    stock: 20,
    category: accessoriesCategory,
    size: "One Size",
    color: "Black",
    level: "All Levels"
  },
  {
    name: "Oakley Snow Goggles",
    description: "High-performance goggles for clear vision in all conditions.",
    price: 149.99,
    stock: 12,
    category: accessoriesCategory,
    size: "One Size",
    color: "White/Red",
    level: "All Levels"
  },
 
  {
    name: "The North Face Freedom Jacket",
    description: "Waterproof and breathable jacket for snowboarding comfort.",
    price: 249.99,
    stock: 8,
    category: apparelCategory,
    size: "M",
    color: "Blue",
    level: "All Levels"
  },
  {
    name: "Burton AK GORE-TEX Pants",
    description: "Durable snowboard pants for freeride or all-mountain terrain.",
    price: 219.99,
    stock: 6,
    category: apparelCategory,
    size: "L",
    color: "Black",
    level: "All Levels"
  }
];


  const result = await db.collection("products").insertMany(products);
  console.log(`Inserted ${result.insertedCount} products into the database!`);

  await client.close();
}

seedProducts().catch(console.error);
