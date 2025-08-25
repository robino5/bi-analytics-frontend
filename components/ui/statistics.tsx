import { cn, numberToMillionsString } from "@/lib/utils";
import { FC } from "react";

interface StatisticsProps {
  label: string;
  value: number;
  classname?: string;
}

const Statistics: FC<StatisticsProps> = ({ label, value, classname }) => {
  return (
    <div className="statistics w-full text-center flex flex-col items-center justify-center">
      {/* Label */}
      <div className={cn(`text-sm font-semibold ${classname}`)}>{label}</div>
      
      {/* Value */}
      <div
        className={cn(`text-md font-bold ${classname}`, {
          "text-red-500": value < 0,
        })}
      >
        {label.toLowerCase().includes("client") ? value : numberToMillionsString(value)}
      </div>
    </div>
  );
};

export default Statistics;
