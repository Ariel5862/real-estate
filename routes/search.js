const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET /api/search/properties - Advanced property search
router.get("/properties", async (req, res) => {
  try {
    const {
      query,
      city,
      neighborhood,
      propertyType,
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      minSize,
      maxSize,
      features,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 20,
    } = req.query;

    // Build search filter
    const filter = { isActive: true };

    // Text search
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { "address.street": { $regex: query, $options: "i" } },
        { "address.neighborhood": { $regex: query, $options: "i" } },
      ];
    }

    // Location filters
    if (city) filter["address.city"] = { $regex: city, $options: "i" };
    if (neighborhood)
      filter["address.neighborhood"] = { $regex: neighborhood, $options: "i" };

    // Property type
    if (propertyType) filter.propertyType = propertyType;

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    // Bedrooms range
    if (minBedrooms || maxBedrooms) {
      filter["rooms.bedrooms"] = {};
      if (minBedrooms) filter["rooms.bedrooms"].$gte = parseInt(minBedrooms);
      if (maxBedrooms) filter["rooms.bedrooms"].$lte = parseInt(maxBedrooms);
    }

    // Size range
    if (minSize || maxSize) {
      filter["size.totalArea"] = {};
      if (minSize) filter["size.totalArea"].$gte = parseInt(minSize);
      if (maxSize) filter["size.totalArea"].$lte = parseInt(maxSize);
    }

    // Features
    if (features) {
      const featureArray = features.split(",");
      filter.features = { $in: featureArray };
    }

    // Status
    if (status) filter.status = status;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute search
    const properties = await Property.find(filter)
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Property.countDocuments(filter);

    // Calculate search statistics
    const stats = {
      totalResults: total,
      averagePrice: 0,
      priceRange: { min: 0, max: 0 },
      propertyTypes: {},
      cities: {},
    };

    if (properties.length > 0) {
      const prices = properties.map((p) => p.price);
      stats.averagePrice = Math.round(
        prices.reduce((a, b) => a + b, 0) / prices.length
      );
      stats.priceRange.min = Math.min(...prices);
      stats.priceRange.max = Math.max(...prices);

      // Count property types
      properties.forEach((p) => {
        stats.propertyTypes[p.propertyType] =
          (stats.propertyTypes[p.propertyType] || 0) + 1;
        stats.cities[p.address.city] = (stats.cities[p.address.city] || 0) + 1;
      });
    }

    res.json({
      properties,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
      stats,
    });
  } catch (error) {
    console.error("Error in property search:", error);
    res.status(500).json({ error: "שגיאה בחיפוש נכסים" });
  }
});

// GET /api/search/areas - Search areas and neighborhoods
router.get("/areas", async (req, res) => {
  try {
    const { query, city } = req.query;

    const filter = {};
    if (city) filter["address.city"] = { $regex: city, $options: "i" };
    if (query)
      filter["address.neighborhood"] = { $regex: query, $options: "i" };

    const areas = await Property.aggregate([
      { $match: { isActive: true, ...filter } },
      {
        $group: {
          _id: {
            city: "$address.city",
            neighborhood: "$address.neighborhood",
          },
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $project: {
          city: "$_id.city",
          neighborhood: "$_id.neighborhood",
          count: 1,
          avgPrice: { $round: ["$avgPrice", 0] },
          minPrice: 1,
          maxPrice: 1,
        },
      },
      { $sort: { count: -1 } },
      { $limit: 50 },
    ]);

    res.json(areas);
  } catch (error) {
    console.error("Error in area search:", error);
    res.status(500).json({ error: "שגיאה בחיפוש אזורים" });
  }
});

// GET /api/search/suggestions - Get search suggestions
router.get("/suggestions", async (req, res) => {
  try {
    const { query, type = "all" } = req.query;

    if (!query || query.length < 2) {
      return res.json({ suggestions: [] });
    }

    let suggestions = [];

    if (type === "all" || type === "cities") {
      const cities = await Property.distinct("address.city", {
        "address.city": { $regex: query, $options: "i" },
        isActive: true,
      });
      suggestions.push(
        ...cities.slice(0, 5).map((city) => ({
          type: "city",
          value: city,
          label: `עיר: ${city}`,
        }))
      );
    }

    if (type === "all" || type === "neighborhoods") {
      const neighborhoods = await Property.distinct("address.neighborhood", {
        "address.neighborhood": { $regex: query, $options: "i" },
        isActive: true,
      });
      suggestions.push(
        ...neighborhoods.slice(0, 5).map((neighborhood) => ({
          type: "neighborhood",
          value: neighborhood,
          label: `שכונה: ${neighborhood}`,
        }))
      );
    }

    if (type === "all" || type === "streets") {
      const streets = await Property.distinct("address.street", {
        "address.street": { $regex: query, $options: "i" },
        isActive: true,
      });
      suggestions.push(
        ...streets.slice(0, 5).map((street) => ({
          type: "street",
          value: street,
          label: `רחוב: ${street}`,
        }))
      );
    }

    res.json({ suggestions });
  } catch (error) {
    console.error("Error getting search suggestions:", error);
    res.status(500).json({ error: "שגיאה בקבלת הצעות חיפוש" });
  }
});

// GET /api/search/trending - Get trending searches
router.get("/trending", async (req, res) => {
  try {
    const trending = await Property.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$address.city",
          count: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          recentViews: { $sum: "$marketAnalysis.views" },
        },
      },
      {
        $project: {
          city: "$_id",
          count: 1,
          avgPrice: { $round: ["$avgPrice", 0] },
          recentViews: 1,
          popularity: { $add: ["$count", { $divide: ["$recentViews", 10] }] },
        },
      },
      { $sort: { popularity: -1 } },
      { $limit: 10 },
    ]);

    res.json({ trending });
  } catch (error) {
    console.error("Error getting trending searches:", error);
    res.status(500).json({ error: "שגיאה בקבלת חיפושים פופולריים" });
  }
});

// GET /api/search/filters - Get available search filters
router.get("/filters", async (req, res) => {
  try {
    const filters = {
      propertyTypes: await Property.distinct("propertyType", {
        isActive: true,
      }),
      cities: await Property.distinct("address.city", { isActive: true }),
      statuses: await Property.distinct("status", { isActive: true }),
      features: await Property.distinct("features", { isActive: true }),
      conditions: await Property.distinct("condition", { isActive: true }),
    };

    // Get price ranges
    const priceStats = await Property.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          avgPrice: { $avg: "$price" },
        },
      },
    ]);

    if (priceStats.length > 0) {
      filters.priceRange = {
        min: priceStats[0].minPrice,
        max: priceStats[0].maxPrice,
        average: Math.round(priceStats[0].avgPrice),
      };
    }

    res.json(filters);
  } catch (error) {
    console.error("Error getting search filters:", error);
    res.status(500).json({ error: "שגיאה בקבלת פילטרים" });
  }
});

module.exports = router;
