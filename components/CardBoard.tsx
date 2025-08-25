import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import PushDateTime from "./push-date-time";

interface CardBoardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  boardIcon?: React.ReactNode;
  pushdate?: any;
}

const CardBoard: React.FC<CardBoardProps> = ({
  title,
  subtitle,
  children,
  className,
  boardIcon,
  pushdate
}) => {
  return (
    <Card className={cn("drop-shadow-md", className, "bg-[#033e4a]")}>
      <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
        <CardTitle className="text-white text-md text-lg flex items-center gap-2">
          {title}
          {pushdate&& <PushDateTime pushdate={pushdate} />}
        </CardTitle>
        <CardDescription className="text-white">
          {subtitle ?? ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center mt-4 mb-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default CardBoard;
