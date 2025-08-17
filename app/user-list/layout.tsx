"use client"
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className={cn("flex items-start justify-between transition-all duration-300")}>
      {/* Sidebar with transition */}
      <div
        className={`border-r min-h-screen shadow-sm transition-all duration-300 ${
          collapsed ? "min-w-[50px]" : "min-w-[300px]"
        }`}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Content area with transition */}
      <div className="flex-grow h-full transition-all duration-300">
        {children}
      </div>
      <Toaster/>
    </section>
  );
}
