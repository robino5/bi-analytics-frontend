"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <Select onValueChange={onChange} defaultValue="all" value={currentTrader}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a RM" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Select RM</SelectItem>
        {traders.map((trader) => (
          <SelectItem key={trader.traderId} value={trader.traderId}>
            {trader.traderId}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
