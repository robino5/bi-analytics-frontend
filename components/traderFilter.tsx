"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname } from "next/navigation";

export interface ITrader {
  traderId: string;
  traderName: string;
}

interface ITraderFilterProps {
  traders: ITrader[];
  currentTrader: string;
  onChange: (branch: string) => void;
}

export default function TraderFilter({
  onChange,
  traders,
  currentTrader,
}: ITraderFilterProps) {
  const pathName = usePathname();

  return (
    <Select onValueChange={onChange} defaultValue="all" value={currentTrader}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a RM" />
      </SelectTrigger>
      <SelectContent>
        {pathName.includes("/rm/") ? (
          <SelectItem value="all">Select RM</SelectItem>
        ) : null}
        {traders.map((trader) => (
          <SelectItem key={trader.traderId} value={trader.traderId}>
            {trader.traderId}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
