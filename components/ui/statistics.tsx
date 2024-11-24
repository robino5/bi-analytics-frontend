import { cn, numberToMillionsString } from "@/lib/utils";
import { FC } from "react";

interface StatisticsProps {
  label: string;
  value: number;
}

const Statistics: FC<StatisticsProps> = ({ label, value }) => {
  return (
    <div className="statistics text-center">
      <div className="text-[0.8rem] text-neutral-500 text-white">{label}</div>
      <div
        className={cn("text-[.9rem] text-neutral-700 font-bold text-white", {
          "text-red-500": value < 0,
        })}
      >
        {numberToMillionsString(value)}
      </div>
    </div>
  );
};

export default Statistics;
