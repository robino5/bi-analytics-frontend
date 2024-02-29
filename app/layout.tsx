import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BI Analytics - LBSL",
  description: "Custom Analytics Application for LBSL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-start justify-between`}>
        <div className="min-w-[300px] border-r min-h-screen shadow-sm">
          <Sidebar />
        </div>
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
