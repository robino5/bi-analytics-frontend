import React from "react";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster"

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "User Management - LBSL",
  description: "Analytics Application for LBSL",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={cn("flex items-start justify-between", fontSans.variable)}
    >
      <div className="min-w-[300px] border-r min-h-screen shadow-sm">
        <Sidebar />
      </div>
      <div className="w-full h-full">{children}</div>
      <Toaster />
    </section>
  );
}
