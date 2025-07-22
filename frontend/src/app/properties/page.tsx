import React from "react";

export default function PropertiesPage() {
  return (
    <main className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 hebrew text-primary-800">
        נכסים זמינים
      </h1>
      <p className="mb-8 text-lg text-primary-600 hebrew">
        בחרו מתוך מגוון רחב של נכסים. לחצו על נכס לפרטים נוספים.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* כאן יופיעו כרטיסי נכסים */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
          <div className="font-bold text-xl mb-2">דירה לדוגמה</div>
          <div className="text-primary-700 mb-2">תל אביב</div>
          <div className="text-pink-600 font-semibold mb-2">₪2,500,000</div>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded">
            לפרטים
          </button>
        </div>
        {/* ... עוד כרטיסים ... */}
      </div>
    </main>
  );
}
