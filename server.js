const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const socketIo = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// Logging
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use("/uploads", express.static("uploads"));

// Basic routes
app.get("/", (req, res) => {
  res.json({
    message: 'ברוכים הבאים לפלטפורמה החכמה לנדל"ן!',
    version: "1.0.0",
    features: [
      "ניתוח נכסים חכם עם AI",
      "מחשבוני משכנתא מתקדמים",
      "סיורים וירטואליים",
      "ייעוץ אישי מבוסס AI",
      "תמיכה ב-4 שפות",
      "ניהול השקעות מרחוק",
    ],
    endpoints: {
      properties: "/api/properties",
      users: "/api/users",
      ai: "/api/ai",
      financial: "/api/financial",
      search: "/api/search",
      virtualTours: "/api/virtual-tours",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    services: {
      ai: "active",
      financial: "active",
      virtualTours: "active",
    },
  });
});

// API Routes
try {
  app.use("/api/properties", require("./routes/properties"));
  app.use("/api/users", require("./routes/users"));
  app.use("/api/ai", require("./routes/ai"));
  app.use("/api/financial", require("./routes/financial"));
  app.use("/api/search", require("./routes/search"));
  app.use("/api/virtual-tours", require("./routes/virtualTours"));
  app.use("/api/userData", require("./routes/userData"));
  console.log("✅ כל הנתיבים נטענו בהצלחה");
} catch (error) {
  console.error("❌ שגיאה בטעינת נתיבים:", error.message);
}

// Socket.IO for real-time features
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "משהו השתבש!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 הפלטפורמה החכמה לנדל"ן פועלת על פורט ${PORT}`);
  console.log(`📱 פתח את הדפדפן בכתובת: http://localhost:${PORT}`);
  console.log(`🔗 API Documentation: http://localhost:${PORT}/api`);
  console.log(`💡 AI Services: http://localhost:${PORT}/api/ai`);
  console.log(`💰 Financial Tools: http://localhost:${PORT}/api/financial`);

  // Try to connect to database
  try {
    const connectDB = require("./config/database");
    connectDB();
  } catch (error) {
    console.log("⚠️  לא ניתן לטעון הגדרות בסיס נתונים");
  }
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
  });
});

module.exports = app;
