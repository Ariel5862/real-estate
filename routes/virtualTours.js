const express = require("express");
const router = express.Router();
const Property = require("../models/Property");

// GET /api/virtual-tours/:propertyId - Get virtual tour for property
router.get("/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId)
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone");

    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    // Generate virtual tour data
    const virtualTour = {
      propertyId,
      property: {
        title: property.title,
        address: property.fullAddress,
        price: property.price,
        currency: property.currency,
        size: property.size,
        rooms: property.rooms,
      },
      tour: {
        type: property.virtualTour?.type || "360",
        url: property.virtualTour?.url || null,
        scenes: [
          {
            id: "entrance",
            name: "כניסה",
            description: "כניסה ראשית לבניין",
            imageUrl: property.images.find((img) => img.isMain)?.url || null,
          },
          {
            id: "living-room",
            name: "סלון",
            description: "חלל המגורים הראשי",
            imageUrl: null,
          },
          {
            id: "kitchen",
            name: "מטבח",
            description: "מטבח מאובזר",
            imageUrl: null,
          },
          {
            id: "bedroom",
            name: "חדר שינה",
            description: "חדר שינה ראשי",
            imageUrl: null,
          },
          {
            id: "bathroom",
            name: "חדר אמבטיה",
            description: "חדר אמבטיה ראשי",
            imageUrl: null,
          },
          {
            id: "balcony",
            name: "מרפסת",
            description: "מרפסת עם נוף",
            imageUrl: null,
          },
        ],
        floorPlan: property.floorPlan || null,
        features: property.features,
        contactInfo: property.contactInfo || {
          name: property.owner?.fullName || "בעל הנכס",
          phone: property.owner?.phone || "",
          email: property.owner?.email || "",
        },
      },
      interactive: {
        canScheduleViewing: property.availability?.isAvailable || false,
        viewingTimes: property.availability?.viewingTimes || [],
        canContactAgent: true,
        canSaveToFavorites: true,
      },
    };

    res.json(virtualTour);
  } catch (error) {
    console.error("Error fetching virtual tour:", error);
    res.status(500).json({ error: "שגיאה בטעינת סיור וירטואלי" });
  }
});

// POST /api/virtual-tours - Create virtual tour
router.post("/", async (req, res) => {
  try {
    const { propertyId, tourType, tourUrl, scenes, floorPlan } = req.body;

    // Validate property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    // Update property with virtual tour data
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      {
        virtualTour: {
          type: tourType || "360",
          url: tourUrl,
        },
        floorPlan: floorPlan || property.floorPlan,
      },
      { new: true }
    );

    res.json({
      message: "סיור וירטואלי נוצר בהצלחה",
      virtualTour: {
        propertyId,
        type: updatedProperty.virtualTour.type,
        url: updatedProperty.virtualTour.url,
        floorPlan: updatedProperty.floorPlan,
      },
    });
  } catch (error) {
    console.error("Error creating virtual tour:", error);
    res.status(500).json({ error: "שגיאה ביצירת סיור וירטואלי" });
  }
});

// POST /api/virtual-tours/:propertyId/schedule - Schedule viewing
router.post("/:propertyId/schedule", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const {
      viewerName,
      viewerEmail,
      viewerPhone,
      preferredDate,
      preferredTime,
      message,
    } = req.body;

    const property = await Property.findById(propertyId)
      .populate("owner", "firstName lastName email phone")
      .populate("agent", "firstName lastName email phone");

    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    // Create viewing request
    const viewingRequest = {
      propertyId,
      viewer: {
        name: viewerName,
        email: viewerEmail,
        phone: viewerPhone,
      },
      preferredDate,
      preferredTime,
      message,
      status: "pending",
      createdAt: new Date(),
    };

    // In a real application, this would be saved to a database
    // and notifications would be sent to the agent/owner

    res.json({
      message: "בקשת צפייה נשלחה בהצלחה",
      viewingRequest,
      contactInfo: {
        agent: property.agent
          ? {
              name: property.agent.fullName,
              phone: property.agent.phone,
              email: property.agent.email,
            }
          : null,
        owner: {
          name: property.owner.fullName,
          phone: property.owner.phone,
          email: property.owner.email,
        },
      },
    });
  } catch (error) {
    console.error("Error scheduling viewing:", error);
    res.status(500).json({ error: "שגיאה בקביעת צפייה" });
  }
});

// GET /api/virtual-tours/:propertyId/analytics - Get tour analytics
router.get("/:propertyId/analytics", async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    // Generate analytics data
    const analytics = {
      propertyId,
      totalViews: property.marketAnalysis?.views || 0,
      tourViews: Math.floor((property.marketAnalysis?.views || 0) * 0.7), // 70% of total views
      averageViewDuration: "3:45", // minutes:seconds
      completionRate: "78%",
      popularScenes: [
        { name: "סלון", views: 85 },
        { name: "מטבח", views: 72 },
        { name: "חדר שינה", views: 68 },
        { name: "מרפסת", views: 45 },
      ],
      viewerActions: {
        scheduledViewings: 12,
        contactedAgent: 8,
        savedToFavorites: 23,
        shared: 5,
      },
      deviceBreakdown: {
        desktop: 45,
        mobile: 40,
        tablet: 15,
      },
      timeOfDay: {
        morning: 25,
        afternoon: 35,
        evening: 40,
      },
    };

    res.json(analytics);
  } catch (error) {
    console.error("Error fetching tour analytics:", error);
    res.status(500).json({ error: "שגיאה בטעינת נתוני סיור" });
  }
});

// POST /api/virtual-tours/:propertyId/feedback - Submit tour feedback
router.post("/:propertyId/feedback", async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { viewerEmail, rating, comments, sceneRatings, suggestions } =
      req.body;

    // Validate property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "נכס לא נמצא" });
    }

    // Create feedback object
    const feedback = {
      propertyId,
      viewerEmail,
      rating: Math.min(5, Math.max(1, rating)), // Ensure rating is 1-5
      comments,
      sceneRatings: sceneRatings || {},
      suggestions,
      createdAt: new Date(),
    };

    // In a real application, this would be saved to a database

    res.json({
      message: "משוב נשלח בהצלחה",
      feedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "שגיאה בשליחת משוב" });
  }
});

// GET /api/virtual-tours/features - Get available virtual tour features
router.get("/features/list", (req, res) => {
  res.json({
    features: [
      {
        name: "סיור 360 מעלות",
        description: "סיור אינטראקטיבי מלא בנכס",
        type: "360",
      },
      {
        name: "סיור וידאו",
        description: "סיור מונחה עם וידאו",
        type: "video",
      },
      {
        name: "סיור אינטראקטיבי",
        description: "סיור עם אפשרויות ניווט מתקדמות",
        type: "interactive",
      },
      {
        name: "תוכנית קומה",
        description: "תוכנית אינטראקטיבית של הנכס",
        type: "floorplan",
      },
      {
        name: "קביעת צפייה",
        description: "קביעת תור לצפייה פיזית",
        type: "scheduling",
      },
      {
        name: "משוב וניתוח",
        description: "איסוף משוב וניתוח התנהגות",
        type: "analytics",
      },
    ],
  });
});

module.exports = router;
