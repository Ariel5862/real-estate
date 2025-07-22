"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // כאן תוכל להוסיף לוגיקת הרשמה אמיתית
    router.push("/dashboard");
  };

  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 hebrew text-primary-800">הרשמה</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="שם מלא"
          className="border rounded px-4 py-2 focus:outline-none"
        />
        <input
          type="email"
          placeholder="אימייל"
          className="border rounded px-4 py-2 focus:outline-none"
        />
        <input
          type="password"
          placeholder="סיסמה"
          className="border rounded px-4 py-2 focus:outline-none"
        />
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded">
          הרשם
        </button>
      </form>
    </main>
  );
}
