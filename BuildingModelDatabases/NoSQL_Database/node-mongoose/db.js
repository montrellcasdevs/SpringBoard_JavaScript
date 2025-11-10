// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();
// Create a new MongoClient
const client = new MongoClient(process.env.MONGO_URI);
// Function to connect to the database
async function connect() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB');
    // Specify and return the database to use [holds the 'movies' collection]
    return client.db("sample_mflix"); 
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

module.exports = connect;

//Database collection of documents