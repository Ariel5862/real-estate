import React, { useState, useEffect } from "react";

interface UploadedItem {
  id: number;
  name: string;
  description: string;
  fileName: string;
}

export default function DashboardPage() {
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch items from backend on mount
  useEffect(() => {
    setLoading(true);
    fetch("/api/userData")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(() => setError("שגיאה בטעינת נתונים מהשרת"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !file) {
      setError("יש למלא שם ולקבוע קובץ");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/userData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, fileName: file.name }),
      });
      if (!res.ok) throw new Error();
      const newItem = await res.json();
      setItems([newItem, ...items]);
      setName("");
      setDescription("");
      setFile(null);
    } catch {
      setError("שגיאה בשליחת נתון לשרת");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6 hebrew text-primary-800">
        משרד אישי
      </h1>
      <p className="mb-8 text-lg text-primary-600 hebrew">
        ברוך הבא למשרד האישי שלך! כאן תוכל להעלות נתונים ולנהל את הנכסים שלך.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="שם הנכס או הנתון"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none"
        />
        <textarea
          placeholder="תיאור (אופציונלי)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="border rounded px-4 py-2 focus:outline-none"
        />
        <button
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "שולח..." : "העלה נתון"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
      <div>
        <h2 className="text-2xl font-bold mb-4 hebrew text-primary-700">
          הנתונים שלך
        </h2>
        {loading && items.length === 0 ? (
          <div className="text-gray-500 hebrew">טוען נתונים...</div>
        ) : items.length === 0 ? (
          <div className="text-gray-500 hebrew">לא הועלו נתונים עדיין.</div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-gray-50 rounded p-4 shadow flex flex-col"
              >
                <span className="font-bold text-lg">{item.name}</span>
                {item.description && (
                  <span className="text-gray-700 mb-1">{item.description}</span>
                )}
                <span className="text-sm text-gray-500">
                  קובץ: {item.fileName}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
