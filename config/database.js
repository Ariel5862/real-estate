const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/smart-real-estate";

    const conn = await mongoose.connect(mongoURI, {
      // MongoDB connection options
    });

    console.log(`📊 MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Graceful shutdown
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.log(
      "💡 טיפ: אם MongoDB לא מותקן, תוכל להשתמש ב-MongoDB Atlas (חינמי)"
    );
    console.log("🔗 https://www.mongodb.com/atlas/database");
    console.log("📝 או להתקין MongoDB Community Server מקומית");
    console.log("🔗 https://www.mongodb.com/try/download/community");

    // Don't exit the process, just log the error
    // process.exit(1);
  }
};

module.exports = connectDB;
