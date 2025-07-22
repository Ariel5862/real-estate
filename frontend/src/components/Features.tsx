"use client";

import Link from "next/link";

export default function Features() {
  const features = [
    {
      icon: "🤖",
      title: "עוזר AI חכם",
      description: "קבל המלצות מותאמות אישית וניתוח שוק מתקדם",
      link: "/ai-assistant",
      color: "bg-blue-500",
    },
    {
      icon: "🏠",
      title: "סיורים וירטואליים",
      description: "בקר נכסים מרחוק עם טכנולוגיה מתקדמת",
      link: "/virtual-tours",
      color: "bg-green-500",
    },
    {
      icon: "💰",
      title: "כלים פיננסיים",
      description: "חישוב משכנתאות, החזר השקעות וניתוח רווחיות",
      link: "/financial",
      color: "bg-purple-500",
    },
    {
      icon: "📊",
      title: "השוואת אזורים",
      description: "השווה מחירים ונתונים בין שכונות שונות",
      link: "/comparison",
      color: "bg-orange-500",
    },
    {
      icon: "🌍",
      title: "תמיכה בינלאומית",
      description: "שירות מותאם ללקוחות זרים ומשקיעים",
      link: "/international",
      color: "bg-red-500",
    },
    {
      icon: "📱",
      title: "ניהול מרחוק",
      description: "נהל את הנכסים שלך מכל מקום בעולם",
      link: "/management",
      color: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 hebrew">
            למה לבחור בפלטפורמה שלנו?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto hebrew">
            טכנולוגיה מתקדמת, שירות אישי וכלים מקצועיים להצלחה בתחום הנדל"ן
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link key={index} href={feature.link} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-200 hover:border-primary-300">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div
                    className={`${feature.color} text-white p-3 rounded-lg text-2xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors hebrew">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 hebrew">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 hebrew">
              מוכן להתחיל?
            </h3>
            <p className="text-xl mb-6 text-primary-100 hebrew">
              הצטרף לאלפי לקוחות מרוצים שכבר מצאו את הנכס המושלם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hebrew"
              >
                התחל עכשיו
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hebrew"
              >
                למידע נוסף
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
