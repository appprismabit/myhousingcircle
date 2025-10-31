import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("🔁 Reusing existing MongoDB connection");
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/bizzmate", {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
