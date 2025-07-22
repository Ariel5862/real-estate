const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, "כותרת הנכס היא שדה חובה"],
      trim: true,
      maxlength: [200, "כותרת לא יכולה להיות ארוכה מ-200 תווים"],
    },
    description: {
      type: String,
      required: [true, "תיאור הנכס הוא שדה חובה"],
      maxlength: [2000, "תיאור לא יכול להיות ארוך מ-2000 תווים"],
    },
    propertyType: {
      type: String,
      required: [true, "סוג הנכס הוא שדה חובה"],
      enum: [
        "דירה",
        "בית פרטי",
        "דירת גן",
        "נטהאוס",
        "מסחרי",
        "משרד",
        "מחסן",
        "קרקע",
      ],
    },
    status: {
      type: String,
      enum: ["למכירה", "להשכרה", "נמכר", "מושכר", "בהזמנה"],
      default: "למכירה",
    },

    // Location
    address: {
      street: {
        type: String,
        required: [true, "כתובת הרחוב היא שדה חובה"],
      },
      city: {
        type: String,
        required: [true, "עיר היא שדה חובה"],
      },
      neighborhood: String,
      postalCode: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // Property Details
    size: {
      totalArea: {
        type: Number,
        required: [true, "שטח כולל הוא שדה חובה"],
        min: [1, "שטח חייב להיות גדול מ-0"],
      },
      builtArea: Number,
      plotArea: Number,
      unit: {
        type: String,
        enum: ['מ"ר', "דונם", "אקר"],
        default: 'מ"ר',
      },
    },
    rooms: {
      bedrooms: {
        type: Number,
        min: 0,
        default: 0,
      },
      bathrooms: {
        type: Number,
        min: 0,
        default: 0,
      },
      livingRooms: {
        type: Number,
        min: 0,
        default: 0,
      },
      balconies: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
    floor: {
      current: Number,
      total: Number,
    },

    // Financial Information
    price: {
      type: Number,
      required: [true, "מחיר הוא שדה חובה"],
      min: [0, "מחיר חייב להיות חיובי"],
    },
    currency: {
      type: String,
      enum: ["ILS", "USD", "EUR", "GBP"],
      default: "ILS",
    },
    monthlyRent: Number,
    maintenanceFee: Number,
    propertyTax: Number,

    // Features and Amenities
    features: [
      {
        type: String,
        enum: [
          "מעלית",
          "חניה",
          "מרפסת",
          "גינה",
          "מחסן",
          "מזגן",
          "חימום",
          "ביטחון",
          "מערכת אזעקה",
          "מצלמות",
          "בריכה",
          "חדר כושר",
          "מערכת מיזוג מרכזית",
          "מטבח מאובזר",
          "ריהוט",
          "מרפסת שמש",
          "גג",
          "חצר",
          "מרפסת גג",
        ],
      },
    ],
    condition: {
      type: String,
      enum: ["חדש", "משופץ", "במצב טוב", "דרוש שיפוץ", "במצב סביר"],
      default: "במצב טוב",
    },
    yearBuilt: Number,
    lastRenovation: Number,

    // Images and Media
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        caption: String,
        isMain: {
          type: Boolean,
          default: false,
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],
    virtualTour: {
      url: String,
      type: {
        type: String,
        enum: ["360", "video", "interactive"],
        default: "360",
      },
    },
    floorPlan: {
      url: String,
      description: String,
    },

    // Owner and Agent Information
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contactInfo: {
      name: String,
      phone: String,
      email: String,
    },

    // Market Information
    marketAnalysis: {
      averagePricePerSqm: Number,
      priceTrend: {
        type: String,
        enum: ["עולה", "יורד", "יציב"],
      },
      daysOnMarket: {
        type: Number,
        default: 0,
      },
      favorites: {
        type: Number,
        default: 0,
      },
    },

    // Views counter
    views: {
      type: Number,
      default: 0,
    },

    // AI Analysis
    aiAnalysis: {
      investmentScore: {
        type: Number,
        min: 0,
        max: 100,
      },
      rentalYield: Number,
      appreciationPotential: {
        type: String,
        enum: ["נמוך", "בינוני", "גבוה", "מצוין"],
      },
      recommendations: [String],
      riskFactors: [String],
    },

    // Availability and Scheduling
    availability: {
      isAvailable: {
        type: Boolean,
        default: true,
      },
      availableFrom: Date,
      viewingTimes: [
        {
          day: {
            type: String,
            enum: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"],
          },
          startTime: String,
          endTime: String,
        },
      ],
    },

    // Legal and Documentation
    documents: [
      {
        name: String,
        url: String,
        type: {
          type: String,
          enum: ["תוכנית", "טאבו", "היתר בנייה", "חוזה", "אחר"],
        },
      },
    ],

    // SEO and Marketing
    keywords: [String],
    metaDescription: String,
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },

    // Timestamps and Status
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
propertySchema.index({ "address.city": 1, "address.neighborhood": 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ "coordinates.lat": 1, "coordinates.lng": 1 });
propertySchema.index({ isFeatured: 1, isActive: 1 });
propertySchema.index({ createdAt: -1 });

// Virtual for price per square meter
propertySchema.virtual("pricePerSqm").get(function () {
  if (this.size && this.size.totalArea && this.price) {
    return this.price / this.size.totalArea;
  }
  return null;
});

// Virtual for full address
propertySchema.virtual("fullAddress").get(function () {
  const parts = [
    this.address.street,
    this.address.neighborhood,
    this.address.city,
    this.address.postalCode,
  ].filter(Boolean);
  return parts.join(", ");
});

// Pre-save middleware
propertySchema.pre("save", function (next) {
  // Set main image if not set
  if (
    this.images &&
    this.images.length > 0 &&
    !this.images.some((img) => img.isMain)
  ) {
    this.images[0].isMain = true;
  }
  next();
});

// Static method to find properties by location
propertySchema.statics.findByLocation = function (city, neighborhood) {
  return this.find({
    "address.city": new RegExp(city, "i"),
    "address.neighborhood": neighborhood
      ? new RegExp(neighborhood, "i")
      : { $exists: true },
    isActive: true,
  });
};

// Instance method to increment views
propertySchema.methods.incrementViews = async function () {
  this.views += 1;
  return await this.save();
};

module.exports = mongoose.model("Property", propertySchema);
