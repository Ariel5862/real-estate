"use client";

import { useState } from "react";
import { FaRegSmile, FaHome, FaRobot } from "react-icons/fa";

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = `${searchQuery} ${
      propertyType !== "all" ? propertyType : ""
    } ${location}`.trim();
    onSearch(query);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden animate-fade-in">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
        alt="Real Estate"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 hebrew drop-shadow-lg animate-fade-in-up">
            מצא את הנכס המושלם
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 hebrew animate-fade-in-up delay-100">
            פלטפורמה חכמה לנדל"ן עם AI, סיורים וירטואליים וכלים פיננסיים מתקדמים
          </p>

          {/* CTA Button */}
          <a
            href="#properties"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-200 mb-8 animate-fade-in-up delay-200"
          >
            התחל עכשיו
          </a>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="חפש נכסים, כתובות, או מילות מפתח..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 hebrew"
                  />
                </div>

                <div>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 hebrew"
                  >
                    <option value="all">כל סוגי הנכסים</option>
                    <option value="apartment">דירה</option>
                    <option value="house">בית פרטי</option>
                    <option value="villa">וילה</option>
                    <option value="commercial">מסחרי</option>
                    <option value="land">קרקע</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hebrew"
                  >
                    חפש נכסים
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up delay-300">
            <div className="text-center flex flex-col items-center">
              <FaHome className="text-4xl mb-2 text-pink-400 drop-shadow" />
              <div className="text-3xl font-bold mb-2">1,500+</div>
              <div className="text-primary-200 hebrew">נכסים זמינים</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <FaRegSmile className="text-4xl mb-2 text-yellow-300 drop-shadow" />
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-primary-200 hebrew">לקוחות מרוצים</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <FaRobot className="text-4xl mb-2 text-cyan-300 drop-shadow" />
              <div className="text-3xl font-bold mb-2">AI</div>
              <div className="text-primary-200 hebrew">עוזר חכם</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
