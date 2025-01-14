import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface CardBoardProps {
  className?: string;
}

import { Skeleton } from "@/components/ui/skeleton";

const SummarySkeletonCard: React.FC<CardBoardProps> = ({ className }) => {
  return (
    <Card className={cn("drop-shadow-md", className)}>
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-4 w-[70px]" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-4 w-[70px]" />
          <Skeleton className="h-4 w-[70px]" />
        </div>
      </CardContent>
    </Card>
  );
};

export const SkeletonStatistics: React.FC<CardBoardProps> = ({ className }) => {
  return (
    <Card className={cn("drop-shadow-md", className)}>
      <CardHeader className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-500 p-2 rounded-tl-lg rounded-tr-lg">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[350px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-[250px] w-full rounded-md" />
      </CardContent>
    </Card>
  );
};

export default SummarySkeletonCard;
