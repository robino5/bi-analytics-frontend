import React from "react";
// import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BI Analytics - LBSL",
  description: "Analytics Application for LBSL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.className} flex items-start justify-between`}
      >
        <div className="min-w-[300px] border-r min-h-screen shadow-sm">
          <Sidebar />
        </div>
        <div className="w-full h-full">{children}</div>
      </body>
    </html>
  );
}
