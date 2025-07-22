"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { apiClient, Property } from "@/lib/api";

interface PropertyGridProps {
  searchQuery: string;
}

export default function PropertyGrid({ searchQuery }: PropertyGridProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProperties();
  }, [searchQuery, filter]);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (searchQuery) {
        response = await apiClient.searchProperties(searchQuery);
      } else {
        const params: Record<string, any> = { limit: 20 };
        if (filter !== "all") {
          params.propertyType = filter;
        }
        response = await apiClient.getProperties(params);
      }

      if (response.error) {
        setError(response.error);
        // Fallback to mock data if API fails
        setProperties(getMockProperties());
      } else if (response.data) {
        // Transform API data to match our interface
        const transformedProperties = response.data.map((prop: any) => ({
          id: prop._id || prop.id,
          title: prop.title,
          type: prop.propertyType,
          location: `${prop.address?.city || ""}${
            prop.address?.neighborhood ? `, ${prop.address.neighborhood}` : ""
          }`,
          price: prop.price,
          size: prop.size?.totalArea || 0,
          bedrooms: prop.rooms?.bedrooms || 0,
          bathrooms: prop.rooms?.bathrooms || 0,
          image:
            prop.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
          description: prop.description,
          features: prop.features || [],
        }));
        setProperties(transformedProperties);
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("שגיאה בטעינת נכסים");
      // Fallback to mock data
      setProperties(getMockProperties());
    } finally {
      setLoading(false);
    }
  };

  const getMockProperties = (): Property[] => [
    {
      id: "1",
      title: "דירה יוקרתית בתל אביב",
      type: "apartment",
      location: "תל אביב, רוטשילד",
      price: 2500000,
      size: 120,
      bedrooms: 3,
      bathrooms: 2,
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      description: "דירה יוקרתית במרכז תל אביב עם נוף לים",
      features: ["מרפסת", "חניה", "מעלית", 'ממ"ד'],
    },
    {
      id: "2",
      title: "בית פרטי בהרצליה",
      type: "house",
      location: "הרצליה, רחוב הים",
      price: 4500000,
      size: 200,
      bedrooms: 4,
      bathrooms: 3,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      description: "בית פרטי מרווח עם גינה פרטית",
      features: ["גינה", "חניה", 'ממ"ד', "מחסן"],
    },
    {
      id: "3",
      title: "וילה יוקרתית בכפר שמריהו",
      type: "villa",
      location: "כפר שמריהו",
      price: 8500000,
      size: 350,
      bedrooms: 5,
      bathrooms: 4,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      description: "וילה יוקרתית עם בריכה פרטית",
      features: ["בריכה", "גינה", "חניה", 'ממ"ד', "מחסן"],
    },
    {
      id: "4",
      title: "חנות מסחרית בירושלים",
      type: "commercial",
      location: "ירושלים, רחוב יפו",
      price: 3200000,
      size: 80,
      bedrooms: 0,
      bathrooms: 1,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      description: "חנות מסחרית במרכז ירושלים",
      features: ["חניה", "מעלית מטען", "מחסן"],
    },
  ];

  const filteredProperties = properties.filter((property) => {
    if (filter === "all") return true;

    const typeMap: Record<string, string> = {
      apartment: "דירה",
      house: "בית פרטי",
      villa: "וילה",
      commercial: "מסחרי",
    };

    return property.type === typeMap[filter] || property.type === filter;
  });

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 hebrew">טוען נכסים...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-red-500 mb-4 hebrew">{error}</div>
            <button onClick={fetchProperties} className="btn-primary hebrew">
              נסה שוב
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } hebrew`}
            >
              הכל
            </button>
            <button
              onClick={() => setFilter("apartment")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "apartment"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } hebrew`}
            >
              דירות
            </button>
            <button
              onClick={() => setFilter("house")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "house"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } hebrew`}
            >
              בתים פרטיים
            </button>
            <button
              onClick={() => setFilter("villa")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "villa"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } hebrew`}
            >
              וילות
            </button>
            <button
              onClick={() => setFilter("commercial")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "commercial"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } hebrew`}
            >
              מסחרי
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hebrew">
            נכסים זמינים
          </h2>
          <p className="text-gray-600 hebrew">
            נמצאו {filteredProperties.length} נכסים
          </p>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hebrew">
              לא נמצאו נכסים
            </h3>
            <p className="text-gray-600 hebrew">
              נסה לשנות את החיפוש או הפילטרים
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
