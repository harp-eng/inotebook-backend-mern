const mongoose = require("mongoose");

const connectToMongo = async () => {
  const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/inotebook";

  try {
    await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectToMongo;
