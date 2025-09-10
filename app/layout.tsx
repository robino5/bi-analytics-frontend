'user client'
import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";
import SessionProvider from "@/auth_provider";
import TanStackProvider from "@/providers/tanStackProvider"
import { ThemeProvider } from "@/components/theme-provider";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BI Analytics - LBSL",
  description: "Custom Analytics Application for LBSL",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={cn("bg-secondary", fontSans.variable)}>
      <ThemeProvider attribute="class" defaultTheme="root" enableSystem>
        <SessionProvider session={session}>
          <TanStackProvider >
            {children}
          </TanStackProvider>
        </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
