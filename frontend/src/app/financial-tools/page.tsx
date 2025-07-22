import React from "react";

export default function FinancialToolsPage() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 hebrew text-primary-800">
        כלים פיננסיים
      </h1>
      <p className="mb-8 text-lg text-primary-600 hebrew">
        השתמשו במחשבונים ובכלים מתקדמים לתכנון פיננסי.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* מחשבון משכנתא */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-bold text-lg mb-2">מחשבון משכנתא</div>
          <div className="text-gray-500 mb-4">
            (כאן יופיע מחשבון אינטראקטיבי)
          </div>
        </div>
        {/* גרף לדוגמה */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-bold text-lg mb-2">גרף החזרים</div>
          <div className="text-gray-500 mb-4">(כאן יופיע גרף דינמי)</div>
        </div>
      </div>
    </main>
  );
}
