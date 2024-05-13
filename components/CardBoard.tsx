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
    <Card className={cn("drop-shadow-md", className)}>
      <CardHeader>
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="">{subtitle ?? ""}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {children}
      </CardContent>
    </Card>
  );
};

export default CardBoard;
