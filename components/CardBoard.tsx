import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface CardBoardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const CardBoard: React.FC<CardBoardProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <Card
      className={cn(
        "bg-gradient-to-r from-gray-800 via-gray-700 to-slate-700 shadow-lg",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-gray-400">{title}</CardTitle>
        <CardDescription className="text-neutral-300">
          {subtitle ?? ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {children}
      </CardContent>
    </Card>
  );
};

export default CardBoard;
