import React from "react";

export default function VirtualToursPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 hebrew text-primary-800">
        סיורים וירטואליים
      </h1>
      <p className="mb-8 text-lg text-primary-600 hebrew">
        גלו נכסים בסיור וירטואלי מהבית!
      </p>
      <div className="space-y-8">
        {/* כאן יופיעו סיורים וירטואליים */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded mb-4 md:mb-0 md:mr-6"></div>
          <div>
            <div className="font-bold text-xl mb-2">דירה לדוגמה</div>
            <div className="text-primary-700 mb-2">תל אביב</div>
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded">
              התחל סיור
            </button>
          </div>
        </div>
        {/* ... עוד סיורים ... */}
      </div>
    </main>
  );
}
