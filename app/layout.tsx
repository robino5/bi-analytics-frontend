import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BI Analytics - LBSL",
  description: "Custom Analytics Application for LBSL",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.className} bg-gradient-to-tl from-slate-300 to-slate-400 via-transparent`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
