import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর | প্রতিদিনের বাজারদর",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        {children}
        <Toaster position="top-right" />
        </body>
    </html>
  );
}
