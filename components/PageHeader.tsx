"use client";

import { FC, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import UserMenu from "./UserMenu";
import { ThemeToggle } from "./theme-toggle";

interface PageHeaderProps {
  name: string;
  children?: ReactNode;
  updateStatus?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ name, children, updateStatus }) => {
  ;

  return (
    <Card className="mt-2 flex justify-center items-center shadow-md bg-card text-card-foreground">
      <CardContent className="w-full p-4 flex justify-between items-center gap-4">
        {/* Left side content */}
        <div className="flex gap-2">{children}</div>

        {/* Center Title */}
        <div className="text-center flex-1">
          <div className="text-2xl font-bold text-heading">{name}</div>
          {updateStatus && (
            <p className="text-red-500 text-lg font-medium">{updateStatus}</p>
          )}
        </div>

        {/* Right side User Menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
        </div>
      </CardContent>
    </Card>

  );
};

export default PageHeader;
