import React from "react";

export default function AiAssistantPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 hebrew text-primary-800">
        עוזר חכם (AI)
      </h1>
      <p className="mb-8 text-lg text-primary-600 hebrew">
        שאלו את העוזר החכם שלנו כל שאלה על נדל"ן!
      </p>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col h-96">
        {/* כאן יופיע ממשק הצ'אט */}
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="text-gray-400 text-center mt-20">
            התחילו לשוחח עם העוזר...
          </div>
        </div>
        <form className="flex">
          <input
            className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
            placeholder="הקלד הודעה..."
          />
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r">
            שלח
          </button>
        </form>
      </div>
    </main>
  );
}
