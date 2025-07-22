const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// POST /api/users/register - Register new user
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      nationality,
      preferredLanguage,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "משתמש עם אימייל זה כבר קיים" });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      nationality,
      preferredLanguage,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "משתמש נרשם בהצלחה",
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "שגיאה בנתונים",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({ error: "שגיאה ברישום המשתמש" });
  }
});

// POST /api/users/login - Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "פרטי התחברות שגויים" });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: "החשבון מושבת" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "פרטי התחברות שגויים" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    res.json({
      message: "התחברות מוצלחת",
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "שגיאה בהתחברות" });
  }
});

// GET /api/users/profile - Get user profile
router.get("/profile", async (req, res) => {
  try {
    // This would typically use middleware to get user from JWT
    const { userId } = req.body; // For now, getting from body

    if (!userId) {
      return res.status(401).json({ error: "לא מורשה" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "שגיאה בטעינת פרופיל המשתמש" });
  }
});

// PUT /api/users/profile - Update user profile
router.put("/profile", async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "לא מורשה" });
    }

    // Remove sensitive fields from update
    delete updateData.password;
    delete updateData.email;
    delete updateData.role;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    res.json({
      message: "פרופיל עודכן בהצלחה",
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "שגיאה בנתונים",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({ error: "שגיאה בעדכון הפרופיל" });
  }
});

// POST /api/users/change-password - Change password
router.post("/change-password", async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "לא מורשה" });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: "סיסמה נוכחית שגויה" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: "סיסמה שונתה בהצלחה" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "שגיאה בשינוי הסיסמה" });
  }
});

// GET /api/users/preferences - Get user preferences
router.get("/preferences", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "לא מורשה" });
    }

    const user = await User.findById(userId).select(
      "investmentGoals preferredAreas budgetRange propertyTypes preferredLanguage"
    );
    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    res.json({
      investmentGoals: user.investmentGoals,
      preferredAreas: user.preferredAreas,
      budgetRange: user.budgetRange,
      propertyTypes: user.propertyTypes,
      preferredLanguage: user.preferredLanguage,
    });
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    res.status(500).json({ error: "שגיאה בטעינת העדפות המשתמש" });
  }
});

// PUT /api/users/preferences - Update user preferences
router.put("/preferences", async (req, res) => {
  try {
    const { userId, ...preferences } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "לא מורשה" });
    }

    const user = await User.findByIdAndUpdate(userId, preferences, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ error: "משתמש לא נמצא" });
    }

    res.json({
      message: "העדפות עודכנו בהצלחה",
      preferences: {
        investmentGoals: user.investmentGoals,
        preferredAreas: user.preferredAreas,
        budgetRange: user.budgetRange,
        propertyTypes: user.propertyTypes,
        preferredLanguage: user.preferredLanguage,
      },
    });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    res.status(500).json({ error: "שגיאה בעדכון העדפות" });
  }
});

// GET /api/users/favorites - Get user favorites (placeholder)
router.get("/favorites", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "לא מורשה" });
    }

    // This would typically fetch from a favorites collection
    res.json({
      message: "רשימת מועדפים",
      favorites: [], // Placeholder
    });
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ error: "שגיאה בטעינת מועדפים" });
  }
});

module.exports = router;
