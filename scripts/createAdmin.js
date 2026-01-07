require('dotenv').config();
const bcrypt = require('bcrypt');
const { MongoClient } = require('mongodb');

async function createAdmin() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();

  const db = client.db("snowshop");
  console.log("Connected to database");

  const password = "StrongAdminPassword123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const adminUser = {
    username: "admin",
       password: hashedPassword,
       email: "admin@snowshop.com",
       role: "admin",
    createdAt: new Date()
  };

  await db.collection("users").insertOne(adminUser);
  console.log("Admin user created!");
  await client.close();
}

createAdmin().catch(console.error);
