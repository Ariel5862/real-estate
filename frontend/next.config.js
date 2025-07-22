/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "images.unsplash.com", "via.placeholder.com"],
  },
  env: {
    API_URL: process.env.API_URL || "http://localhost:5000",
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY || "",
  },
};

module.exports = nextConfig;
