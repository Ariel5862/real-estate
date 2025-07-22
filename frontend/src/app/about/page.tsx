import React from "react";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 hebrew text-primary-800">אודות</h1>
      <p className="mb-8 text-lg text-primary-600 hebrew">
        הפלטפורמה החכמה לנדל"ן בישראל. אנו מחויבים להעניק לכם את הכלים המתקדמים
        ביותר למציאת הנכס המושלם.
      </p>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-bold text-lg mb-2">החזון שלנו</div>
        <div className="text-gray-700 mb-4">
          להפוך את עולם הנדל"ן לשקוף, נגיש וחכם יותר בעזרת טכנולוגיה מתקדמת.
        </div>
        <div className="font-bold text-lg mb-2">הצוות</div>
        <div className="text-gray-700">
          צוות מקצועי עם ניסיון רב בנדל"ן וטכנולוגיה.
        </div>
      </div>
    </main>
  );
}
