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
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
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


export const SkeletonStatisticsRatio: React.FC<CardBoardProps> = ({ className }) => {
  return (
    <div className="space-y-5">
      {/* Dropdown skeleton */}
      <div className="w-[120px]">
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Chart skeleton */}
      <div className="w-full h-[178px]">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>

      {/* RSI Progress skeleton */}
      <div className="w-full">
        <Skeleton className="h-6 w-[130px] rounded-full" />
      </div>
    </div>
  );
};

export default SummarySkeletonCard;
