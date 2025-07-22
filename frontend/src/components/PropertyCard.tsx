"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "@/lib/api";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "apartment":
      case "דירה":
        return "🏢";
      case "house":
      case "בית פרטי":
        return "🏠";
      case "villa":
      case "וילה":
        return "🏰";
      case "commercial":
      case "מסחרי":
        return "🏪";
      case "land":
      case "קרקע":
        return "🌱";
      default:
        return "🏠";
    }
  };

  const getPropertyTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      apartment: "דירה",
      house: "בית",
      villa: "וילה",
      commercial: "מסחרי",
      land: "קרקע",
      דירה: "דירה",
      "בית פרטי": "בית",
      וילה: "וילה",
      מסחרי: "מסחרי",
      קרקע: "קרקע",
    };
    return typeMap[type] || type;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-primary-600 text-white px-2 py-1 rounded-lg text-sm font-medium hebrew">
            {getPropertyTypeIcon(property.type)}{" "}
            {getPropertyTypeName(property.type)}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hebrew line-clamp-2">
          {property.title}
        </h3>

        <p className="text-gray-600 mb-3 hebrew">📍 {property.location}</p>

        <p className="text-gray-700 mb-4 hebrew line-clamp-2">
          {property.description}
        </p>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="text-center">
            <div className="text-gray-600 hebrew">גודל</div>
            <div className="font-semibold text-gray-900">
              {property.size} מ"ר
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 hebrew">חדרים</div>
            <div className="font-semibold text-gray-900">
              {property.bedrooms}
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 hebrew">שירותים</div>
            <div className="font-semibold text-gray-900">
              {property.bathrooms}
            </div>
          </div>
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hebrew"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs hebrew">
                  +{property.features.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold text-primary-600 hebrew">
                {formatPrice(property.price)}
              </div>
            </div>
            <Link href={`/properties/${property.id}`} className="btn-primary">
              פרטים נוספים
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
