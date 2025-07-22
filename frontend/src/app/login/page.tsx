import React from "react";

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 hebrew text-primary-800">
        התחברות
      </h1>
      <form className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
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
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded">
          התחבר
        </button>
      </form>
    </main>
  );
}
