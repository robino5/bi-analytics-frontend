import React from "react";
import "../globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["500", "600", "700"],
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
        className={`${inter.className} bg-gradient-to-tl from-slate-300 to-slate-400 via-transparent`}
      >
        <div>{children}</div>
      </body>
    </html>
  );
}
