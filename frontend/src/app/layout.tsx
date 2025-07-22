import type { Metadata } from "next";
import { Inter, Heebo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const heebo = Heebo({
  subsets: ["latin"],
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: 'פלטפורמה חכמה לנדל"ן',
  description: 'פלטפורמה מתקדמת לנדל"ן עם AI, סיורים וירטואליים וכלים פיננסיים',
  keywords: 'נדל"ן, השקעות, AI, סיורים וירטואליים, פיננסים',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.variable} ${heebo.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
