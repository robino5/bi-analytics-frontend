import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import AuthWrapper from "@/auth_wrapper";

const fontSans = FontSans({
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
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "bg-gradient-to-tl from-slate-300 to-slate-400 via-transparent",
          fontSans.variable
        )}
      >
        <AuthWrapper>
          <div>{children}</div>
        </AuthWrapper>
      </body>
    </html>
  );
}
