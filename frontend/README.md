# פלטפורמה חכמה לנדל"ן - Frontend

פדנד מתקדם לפלטפורמה חכמה לנדל"ן הבנוי ב-Next.js עם TypeScript, Tailwind CSS ו-Material-UI.

## תכונות

- 🏠 **חיפוש נכסים מתקדם** - חיפוש חכם עם פילטרים מתקדמים
- 🤖 **עוזר AI** - המלצות מותאמות אישית וניתוח שוק
- 🏠 **סיורים וירטואליים** - טכנולוגיה מתקדמת לסיורים מרחוק
- 💰 **כלים פיננסיים** - חישוב משכנתאות וניתוח השקעות
- 📊 **השוואת אזורים** - השוואה מתקדמת בין שכונות
- 🌍 **תמיכה בינלאומית** - שירות מותאם ללקוחות זרים
- 📱 **רספונסיבי** - עיצוב מותאם לכל המכשירים

## טכנולוגיות

- **Next.js 14** - React framework עם App Router
- **TypeScript** - טיפוסים בטוחים
- **Tailwind CSS** - עיצוב מודרני ורספונסיבי
- **Material-UI** - קומפוננטים מתקדמים
- **React Hook Form** - ניהול טפסים
- **React Query** - ניהול state וקאש
- **i18n** - תמיכה בשפות מרובות

## התקנה

1. **התקן תלויות:**

```bash
npm install
```

2. **הפעל את השרת:**

```bash
npm run dev
```

3. **פתח בדפדפן:**

```
http://localhost:3000
```

## מבנה הפרויקט

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Layout ראשי
│   ├── page.tsx        # דף הבית
│   └── globals.css     # סגנונות גלובליים
├── components/         # קומפוננטים
│   ├── Header.tsx      # כותרת עליונה
│   ├── Hero.tsx        # אזור גיבור
│   ├── PropertyGrid.tsx # רשת נכסים
│   ├── PropertyCard.tsx # כרטיס נכס
│   ├── Features.tsx    # תכונות הפלטפורמה
│   └── Footer.tsx      # כותרת תחתונה
├── lib/               # ספריות וקונפיגורציה
├── types/             # הגדרות TypeScript
├── utils/             # פונקציות עזר
└── styles/            # סגנונות נוספים
```

## סקריפטים זמינים

- `npm run dev` - הפעל שרת פיתוח
- `npm run build` - בניית הפרויקט
- `npm run start` - הפעל שרת ייצור
- `npm run lint` - בדיקת קוד
- `npm run type-check` - בדיקת טיפוסים

## משתני סביבה

צור קובץ `.env.local` עם המשתנים הבאים:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## API Endpoints

הפדנד מתחבר לשרת ה-API הבא:

- `GET /api/properties` - קבלת רשימת נכסים
- `GET /api/properties/:id` - פרטי נכס ספציפי
- `POST /api/ai/chat` - שיחה עם עוזר AI
- `POST /api/financial/calculate` - חישובים פיננסיים
- `GET /api/virtual-tours` - סיורים וירטואליים

## עיצוב

הפרויקט משתמש ב-Tailwind CSS עם עיצוב מותאם לעברית:

- **כיוון טקסט:** RTL (מימין לשמאל)
- **פונטים:** Inter (אנגלית), Heebo (עברית)
- **צבעים:** מערכת צבעים מותאמת לנדל"ן
- **רספונסיביות:** מותאם לכל גדלי מסך

## פיתוח

### הוספת קומפוננט חדש

1. צור קובץ חדש ב-`src/components/`
2. השתמש ב-TypeScript interfaces
3. הוסף סגנונות Tailwind CSS
4. תמוך ב-RTL ורספונסיביות

### הוספת דף חדש

1. צור תיקייה ב-`src/app/`
2. הוסף קובץ `page.tsx`
3. השתמש ב-Metadata API למידע SEO
4. הוסף ניווט ב-Header

## תרומה

1. Fork את הפרויקט
2. צור branch חדש
3. בצע שינויים
4. שלח Pull Request

## רישיון

MIT License - ראה קובץ LICENSE לפרטים נוספים.

## תמיכה

לשאלות ותמיכה:

- 📧 info@smart-realestate.com
- 📞 03-1234567
- 🌐 https://smart-realestate.com
