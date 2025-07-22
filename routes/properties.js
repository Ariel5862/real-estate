const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET /api/properties - Get all properties with pagination and filters
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (city) filter["address.city"] = new RegExp(city, "i");
    if (propertyType) filter.propertyType = propertyType;
    if (status) filter.status = status;
    if (bedrooms) filter["rooms.bedrooms"] = { $gte: parseInt(bedrooms) };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    const properties = await Property.find(filter)
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "שגיאה בטעינת הנכסים" });
  }
});

// GET /api/properties/:id - Get single property
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone");

    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    // Increment views
    try {
      await property.incrementViews();
    } catch (viewError) {
      console.error("Error incrementing views:", viewError);
      // Continue even if view increment fails
    }

    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "שגיאה בטעינת הנכס" });
  }
});

// POST /api/properties - Create new property
router.post("/", async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();

    res.status(201).json({
      message: "נכס נוצר בהצלחה",
      property,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "שגיאה בנתונים",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({ error: "שגיאה ביצירת הנכס" });
  }
});

// PUT /api/properties/:id - Update property
router.put("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone");

    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    res.json({
      message: "נכס עודכן בהצלחה",
      property,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "שגיאה בנתונים",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({ error: "שגיאה בעדכון הנכס" });
  }
});

// DELETE /api/properties/:id - Delete property
router.delete("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    res.json({ message: "נכס נמחק בהצלחה" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "שגיאה במחיקת הנכס" });
  }
});

// GET /api/properties/search/location - Search by location
router.get("/search/location", async (req, res) => {
  try {
    const { city, neighborhood } = req.query;

    const properties = await Property.findByLocation(city, neighborhood)
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone")
      .limit(20);

    res.json(properties);
  } catch (error) {
    console.error("Error searching properties by location:", error);
    res.status(500).json({ error: "שגיאה בחיפוש נכסים" });
  }
});

// GET /api/properties/featured - Get featured properties
router.get("/featured/list", async (req, res) => {
  try {
    const properties = await Property.find({
      isFeatured: true,
      isActive: true,
    })
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(properties);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    res.status(500).json({ error: "שגיאה בטעינת נכסים מומלצים" });
  }
});

module.exports = router;
