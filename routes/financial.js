const express = require("express");
const router = express.Router();

// POST /api/financial/mortgage-calculator - Mortgage calculator
router.post("/mortgage-calculator", async (req, res) => {
  try {
    const {
      propertyPrice,
      downPayment,
      interestRate,
      loanTerm,
      monthlyIncome,
      otherDebts,
    } = req.body;

    // Calculate mortgage
    const loanAmount = propertyPrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Monthly payment calculation
    const monthlyPayment =
      (loanAmount *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Additional costs
    const propertyTax = (propertyPrice * 0.001) / 12; // 0.1% annually
    const insurance = (propertyPrice * 0.005) / 12; // 0.5% annually
    const maintenance = (propertyPrice * 0.01) / 12; // 1% annually

    const totalMonthlyPayment =
      monthlyPayment + propertyTax + insurance + maintenance;
    const debtToIncomeRatio =
      (totalMonthlyPayment + otherDebts) / monthlyIncome;

    const result = {
      loanAmount,
      monthlyPayment: Math.round(monthlyPayment),
      totalMonthlyPayment: Math.round(totalMonthlyPayment),
      propertyTax: Math.round(propertyTax),
      insurance: Math.round(insurance),
      maintenance: Math.round(maintenance),
      debtToIncomeRatio: (debtToIncomeRatio * 100).toFixed(1),
      isApproved: debtToIncomeRatio <= 0.43,
      totalInterest: Math.round(monthlyPayment * numberOfPayments - loanAmount),
      totalCost: Math.round(monthlyPayment * numberOfPayments + downPayment),
    };

    res.json({
      message: "חישוב משכנתא הושלם",
      result,
    });
  } catch (error) {
    console.error("Error in mortgage calculation:", error);
    res.status(500).json({ error: "שגיאה בחישוב משכנתא" });
  }
});

// POST /api/financial/roi-calculator - ROI calculator
router.post("/roi-calculator", async (req, res) => {
  try {
    const {
      purchasePrice,
      monthlyRent,
      monthlyExpenses,
      appreciationRate,
      holdingPeriod,
    } = req.body;

    // Calculate annual cash flow
    const annualRent = monthlyRent * 12;
    const annualExpenses = monthlyExpenses * 12;
    const annualCashFlow = annualRent - annualExpenses;

    // Calculate appreciation
    const futureValue =
      purchasePrice * Math.pow(1 + appreciationRate / 100, holdingPeriod);
    const appreciationGain = futureValue - purchasePrice;

    // Calculate ROI
    const totalReturn = annualCashFlow * holdingPeriod + appreciationGain;
    const roi = (totalReturn / purchasePrice) * 100;
    const annualizedRoi =
      (Math.pow(1 + roi / 100, 1 / holdingPeriod) - 1) * 100;

    // Calculate cash on cash return
    const cashOnCashReturn = (annualCashFlow / purchasePrice) * 100;

    const result = {
      purchasePrice,
      monthlyRent,
      annualRent,
      annualExpenses,
      annualCashFlow: Math.round(annualCashFlow),
      futureValue: Math.round(futureValue),
      appreciationGain: Math.round(appreciationGain),
      totalReturn: Math.round(totalReturn),
      roi: roi.toFixed(2),
      annualizedRoi: annualizedRoi.toFixed(2),
      cashOnCashReturn: cashOnCashReturn.toFixed(2),
      holdingPeriod,
      monthlyCashFlow: Math.round(annualCashFlow / 12),
    };

    res.json({
      message: "חישוב ROI הושלם",
      result,
    });
  } catch (error) {
    console.error("Error in ROI calculation:", error);
    res.status(500).json({ error: "שגיאה בחישוב ROI" });
  }
});

// POST /api/financial/investment-analysis - Investment analysis
router.post("/investment-analysis", async (req, res) => {
  try {
    const { propertyData, marketData, userProfile } = req.body;

    // Calculate various metrics
    const pricePerSqm = propertyData.price / propertyData.size.totalArea;
    const rentalYield =
      ((propertyData.monthlyRent * 12) / propertyData.price) * 100;

    // Market comparison
    const marketAveragePrice =
      marketData.averagePricePerSqm || pricePerSqm * 1.1;
    const priceComparison = (
      (pricePerSqm / marketAveragePrice - 1) *
      100
    ).toFixed(1);

    // Risk assessment
    const riskScore = Math.min(
      100,
      Math.max(
        0,
        50 +
          (rentalYield > 5 ? 20 : -10) +
          (priceComparison < 0 ? 15 : -10) +
          (propertyData.age < 10 ? 10 : -5)
      )
    );

    const analysis = {
      pricePerSqm: Math.round(pricePerSqm),
      rentalYield: rentalYield.toFixed(2),
      priceComparison:
        priceComparison > 0 ? `+${priceComparison}%` : `${priceComparison}%`,
      riskScore,
      riskLevel: riskScore < 30 ? "נמוך" : riskScore < 60 ? "בינוני" : "גבוה",
      recommendation:
        riskScore > 70 ? "מומלץ" : riskScore > 40 ? "שקול" : "לא מומלץ",
      keyMetrics: {
        capRate: (rentalYield - 2).toFixed(2), // Assuming 2% expenses
        priceToRentRatio: (
          propertyData.price /
          (propertyData.monthlyRent * 12)
        ).toFixed(1),
        grossRentMultiplier: (
          propertyData.price /
          (propertyData.monthlyRent * 12)
        ).toFixed(1),
      },
      marketInsights: [
        "הנכס מתחת למחיר השוק הממוצע",
        "תשואה גבוהה מהממוצע באזור",
        "פוטנציאל להערכה בעתיד",
      ],
    };

    res.json({
      message: "ניתוח השקעות הושלם",
      analysis,
    });
  } catch (error) {
    console.error("Error in investment analysis:", error);
    res.status(500).json({ error: "שגיאה בניתוח השקעות" });
  }
});

// POST /api/financial/affordability-calculator - Affordability calculator
router.post("/affordability-calculator", async (req, res) => {
  try {
    const { annualIncome, downPayment, monthlyDebts, interestRate, loanTerm } =
      req.body;

    // Calculate maximum loan amount
    const monthlyIncome = annualIncome / 12;
    const maxMonthlyPayment = monthlyIncome * 0.28; // 28% rule
    const availableForHousing = maxMonthlyPayment - monthlyDebts;

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Maximum loan amount
    const maxLoanAmount =
      (availableForHousing *
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)) /
      (monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments));

    // Maximum property price
    const maxPropertyPrice = maxLoanAmount + downPayment;

    // Additional costs
    const propertyTax = (maxPropertyPrice * 0.001) / 12;
    const insurance = (maxPropertyPrice * 0.005) / 12;
    const maintenance = (maxPropertyPrice * 0.01) / 12;

    const result = {
      annualIncome,
      monthlyIncome: Math.round(monthlyIncome),
      maxMonthlyPayment: Math.round(maxMonthlyPayment),
      availableForHousing: Math.round(availableForHousing),
      maxLoanAmount: Math.round(maxLoanAmount),
      maxPropertyPrice: Math.round(maxPropertyPrice),
      additionalCosts: {
        propertyTax: Math.round(propertyTax),
        insurance: Math.round(insurance),
        maintenance: Math.round(maintenance),
        total: Math.round(propertyTax + insurance + maintenance),
      },
      recommendations: [
        "שקול חסכונות נוספים לראש משכנתא",
        "בדוק אפשרויות מימון נוספות",
        "התמקד באזורים עם יחס מחיר-תשואה טוב",
      ],
    };

    res.json({
      message: "חישוב יכולת רכישה הושלם",
      result,
    });
  } catch (error) {
    console.error("Error in affordability calculation:", error);
    res.status(500).json({ error: "שגיאה בחישוב יכולת רכישה" });
  }
});

// GET /api/financial/tools - Get available financial tools
router.get("/tools", (req, res) => {
  res.json({
    tools: [
      {
        name: "מחשבון משכנתא",
        description: "חישוב תשלומי משכנתא ויכולת החזר",
        endpoint: "/api/financial/mortgage-calculator",
      },
      {
        name: "מחשבון ROI",
        description: "חישוב תשואה על השקעה",
        endpoint: "/api/financial/roi-calculator",
      },
      {
        name: "ניתוח השקעות",
        description: "ניתוח מקיף של נכס להשקעה",
        endpoint: "/api/financial/investment-analysis",
      },
      {
        name: "מחשבון יכולת רכישה",
        description: "חישוב יכולת רכישה מקסימלית",
        endpoint: "/api/financial/affordability-calculator",
      },
    ],
  });
});

module.exports = router;
