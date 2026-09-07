import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { cn } from "@/lib/utils";

interface NoDataFoundProps {
  title?: string;
  className?: string;
}

export default function NoDataFound({ title, className }: NoDataFoundProps) {
  return (
    <Card className={cn("col-span-12 overflow-auto bg-[#033e4a]", className)}>
      {title && (
        <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
          <CardTitle className="text-white text-md text-lg">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="mt-2 text-white text-center py-6">
        No Data Found
      </CardContent>
    </Card>
  );
}
