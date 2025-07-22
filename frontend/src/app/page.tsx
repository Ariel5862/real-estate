"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero onSearch={setSearchQuery} />
        <PropertyGrid searchQuery={searchQuery} />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
