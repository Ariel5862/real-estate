# פלטפורמה חכמה לנדל"ן 🏠

פלטפורמה מתקדמת לנדל"ן המיועדת ללקוחות מחו"ל ולמשקיעים, עם תכונות AI מתקדמות וכלים פיננסיים.

## ✨ תכונות עיקריות

- 🤖 **ייעוץ AI אישי** - ניתוח נכסים חכם עם המלצות מותאמות אישית
- 💰 **כלים פיננסיים מתקדמים** - מחשבוני משכנתא, ניתוח השקעות, ROI
- 🏠 **סיורים וירטואליים** - חוויה אינטראקטיבית מרחוק
- 🌍 **תמיכה ב-4 שפות** - עברית, אנגלית, רוסית, ערבית
- 📊 **ניתוח אזורים** - השוואות מחירים וטרנדים
- 🔒 **ניהול מרחוק** - מעקב ותחזוקה מרחוק
- 📱 **ממשק מתקדם** - חווית משתמש מודרנית

## 🚀 התקנה והפעלה

### דרישות מקדימות

- Node.js 18+
- MongoDB (אופציונלי - ניתן להשתמש ב-MongoDB Atlas)
- npm או yarn

### התקנה

1. **שכפול הפרויקט**

```bash
git clone <repository-url>
cd smart-real-estate-platform
```

2. **התקנת תלויות**

```bash
npm install
```

3. **הגדרת משתני סביבה**
   צור קובץ `.env` בתיקיית השורש:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-real-estate
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

4. **הפעלת השרת**

```bash
# פיתוח עם nodemon
npm run dev

# או הפעלה רגילה
npm start
```

## 📁 מבנה הפרויקט

```
smart-real-estate-platform/
├── config/           # הגדרות בסיס נתונים ושרת
├── models/           # מודלים של MongoDB
├── services/         # שירותים (AI, פיננסי, וכו')
├── routes/           # נתיבי API
├── middleware/       # middleware מותאם אישית
├── utils/            # פונקציות עזר
├── uploads/          # קבצים שהועלו
├── logs/             # קבצי לוג
├── tests/            # בדיקות
└── server.js         # נקודת כניסה ראשית
```

## 🔗 API Endpoints

### נכסים

- `GET /api/properties` - רשימת נכסים
- `POST /api/properties` - הוספת נכס חדש
- `GET /api/properties/:id` - פרטי נכס
- `PUT /api/properties/:id` - עדכון נכס
- `DELETE /api/properties/:id` - מחיקת נכס

### משתמשים

- `POST /api/users/register` - הרשמה
- `POST /api/users/login` - התחברות
- `GET /api/users/profile` - פרופיל משתמש
- `PUT /api/users/profile` - עדכון פרופיל

### AI Services

- `POST /api/ai/analyze-property` - ניתוח נכס
- `POST /api/ai/investment-advice` - ייעוץ השקעות
- `POST /api/ai/market-analysis` - ניתוח שוק

### כלים פיננסיים

- `POST /api/financial/mortgage-calculator` - מחשבון משכנתא
- `POST /api/financial/roi-calculator` - חישוב ROI
- `POST /api/financial/investment-analysis` - ניתוח השקעות

### חיפוש

- `GET /api/search/properties` - חיפוש נכסים
- `GET /api/search/areas` - חיפוש אזורים

### סיורים וירטואליים

- `GET /api/virtual-tours/:propertyId` - סיור וירטואלי
- `POST /api/virtual-tours` - יצירת סיור חדש

## 🛠️ פיתוח

### הרצת בדיקות

```bash
npm test
```

### בניית הפרויקט

```bash
npm run build
```

### בדיקת איכות קוד

```bash
npm run lint
```

## 🌐 תמיכה בשפות

הפלטפורמה תומכת ב-4 שפות:

- 🇮🇱 עברית
- 🇺🇸 אנגלית
- 🇷🇺 רוסית
- 🇸🇦 ערבית

## 🔒 אבטחה

- הצפנת סיסמאות עם bcrypt
- JWT לאימות
- Rate limiting
- Helmet לאבטחה
- CORS מוגדר
- Validation של קלט

## 📊 ביצועים

- דחיסה עם compression
- Caching חכם
- אופטימיזציה של תמונות
- ניטור ביצועים

## 🤝 תרומה לפרויקט

1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📄 רישיון

פרויקט זה מוגן תחת רישיון MIT.

## 📞 תמיכה

לשאלות ותמיכה:

- 📧 Email: support@smart-real-estate.com
- 💬 Discord: [הצטרף לקהילה שלנו]
- 📱 WhatsApp: +972-XX-XXXXXXX

---

**בנוי עם ❤️ בישראל**
