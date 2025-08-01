"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 hebrew">
          משהו השתבש!
        </h2>
        <p className="text-gray-600 mb-6 hebrew">
          {error.message || "אירעה שגיאה לא צפויה"}
        </p>
        <button onClick={reset} className="btn-primary hebrew">
          נסה שוב
        </button>
      </div>
    </div>
  );
}
