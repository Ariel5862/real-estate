const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, "שם פרטי הוא שדה חובה"],
      trim: true,
      maxlength: [50, "שם פרטי לא יכול להיות ארוך מ-50 תווים"],
    },
    lastName: {
      type: String,
      required: [true, "שם משפחה הוא שדה חובה"],
      trim: true,
      maxlength: [50, "שם משפחה לא יכול להיות ארוך מ-50 תווים"],
    },
    email: {
      type: String,
      required: [true, "אימייל הוא שדה חובה"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "אנא הכנס כתובת אימייל תקינה",
      ],
    },
    password: {
      type: String,
      required: [true, "סיסמה היא שדה חובה"],
      minlength: [6, "סיסמה חייבת להיות לפחות 6 תווים"],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, "אנא הכנס מספר טלפון תקין"],
    },

    // Profile Information
    profileImage: {
      type: String,
      default: "default-avatar.jpg",
    },
    dateOfBirth: {
      type: Date,
    },
    nationality: {
      type: String,
      enum: ["ישראל", 'ארה"ב', "רוסיה", "בריטניה", "קנדה", "אוסטרליה", "אחר"],
      default: "ישראל",
    },
    preferredLanguage: {
      type: String,
      enum: ["he", "en", "ru", "ar"],
      default: "he",
    },

    // Real Estate Preferences
    investmentGoals: [
      {
        type: String,
        enum: ["השכרה", "מכירה", "השקעה ארוכת טווח", "מגורים", "מסחרי"],
      },
    ],
    preferredAreas: [
      {
        type: String,
      },
    ],
    budgetRange: {
      min: {
        type: Number,
        min: 0,
      },
      max: {
        type: Number,
        min: 0,
      },
    },
    propertyTypes: [
      {
        type: String,
        enum: [
          "דירה",
          "בית פרטי",
          "דירת גן",
          "נטהאוס",
          "מסחרי",
          "משרד",
          "מחסן",
        ],
      },
    ],

    // Financial Information
    annualIncome: {
      type: Number,
      min: 0,
    },
    creditScore: {
      type: Number,
      min: 300,
      max: 850,
    },
    downPayment: {
      type: Number,
      min: 0,
    },

    // Account Status
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },

    // Timestamps
    lastLogin: {
      type: Date,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes

userSchema.index({ phone: 1 });
userSchema.index({ preferredAreas: 1 });

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive data when converting to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.emailVerificationToken;
  delete userObject.passwordResetToken;
  return userObject;
};

module.exports = mongoose.model("User", userSchema);
