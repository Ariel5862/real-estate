const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  description: string;
  features: string[];
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || "שגיאה לא צפויה",
        };
      }

      return { data };
    } catch (error) {
      console.error("API Error:", error);
      return {
        error: "שגיאה בחיבור לשרת",
      };
    }
  }

  // Properties API
  async getProperties(
    params?: Record<string, any>
  ): Promise<ApiResponse<Property[]>> {
    const searchParams = new URLSearchParams(params);
    return this.request<Property[]>(`/api/properties?${searchParams}`);
  }

  async getProperty(id: string): Promise<ApiResponse<Property>> {
    return this.request<Property>(`/api/properties/${id}`);
  }

  // Search API
  async searchProperties(query: string): Promise<ApiResponse<Property[]>> {
    return this.request<Property[]>(
      `/api/search/properties?query=${encodeURIComponent(query)}`
    );
  }

  // AI API
  async getAiFeatures(): Promise<ApiResponse<any>> {
    return this.request("/api/ai/features");
  }

  async chatWithAi(message: string): Promise<ApiResponse<any>> {
    return this.request("/api/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  // Financial API
  async calculateMortgage(data: any): Promise<ApiResponse<any>> {
    return this.request("/api/financial/mortgage-calculator", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async calculateRoi(data: any): Promise<ApiResponse<any>> {
    return this.request("/api/financial/roi-calculator", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
