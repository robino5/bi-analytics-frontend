"use client";

import { FC, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import UserMenu from "./UserMenu";

interface PageHeaderProps {
  name: string;
  children?: ReactNode;
  updateStatus?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ name, children, updateStatus }) => {
 ;

  return (
    <Card className="mt-2 flex justify-center items-center shadow-md bg-[#FAF7F0]">
      <CardContent className="w-full p-4 flex justify-between items-center gap-4">
        {/* Left side content */}
        <div className="flex gap-2">{children}</div>

        {/* Center Title */}
        <div className="text-center flex-2 w-full">
          <div className="text-2xl font-bold">{name}</div>
          {updateStatus && (
            <p className="text-red-500 text-lg">{updateStatus}</p>
          )}
        </div>

        {/* Right side User Menu */}
         <UserMenu />
      </CardContent>
    </Card>
  );
};

export default PageHeader;
