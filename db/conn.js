const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer; // Store the MongoMemoryServer instance globally

async function connect() {
  if (!mongoServer) {
    mongoServer = await MongoMemoryServer.create();
  }
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: "test" });
  console.log("mongodb connected", mongoUri);
}

async function disconnect() {
  if (mongoServer) {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log("mongodb disconnected");
    mongoServer = null; 
  }
}

module.exports = { connect, disconnect };
