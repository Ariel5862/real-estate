const express = require("express");
const router = express.Router();

// In-memory storage for demo
let userData = [];

// GET /userData - get all items
router.get("/", (req, res) => {
  res.json(userData);
});

// POST /userData - add new item
router.post("/", (req, res) => {
  const { name, description, fileName } = req.body;
  if (!name || !fileName) {
    return res.status(400).json({ error: "Name and fileName are required" });
  }
  const newItem = {
    id: Date.now(),
    name,
    description: description || "",
    fileName,
  };
  userData.unshift(newItem);
  res.status(201).json(newItem);
});

module.exports = router;
