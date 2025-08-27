"use client";

import { RoleType } from "@/app/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

export interface ITrader {
  branchCode:any;
  traderId: string;
  traderName: string;
}

interface ITraderFilterProps {
  traders: ITrader[];
  currentTrader: string;
  onChange: (_trader: string) => void;
}

export default function TraderFilter({
  onChange,
  traders,
  currentTrader,
}: ITraderFilterProps) {
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth/login");
  }

  const [traderLocked, _] = useState(
    session?.user.role.toString() === RoleType.REGIONAL_MANAGER
  );
  const pathName = usePathname();

  return (
    <Select
      onValueChange={(value) => onChange(value === "all" ? "" : value)}
      value={currentTrader}
      disabled={traderLocked}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a RM" />
      </SelectTrigger>
      <SelectContent>
        {pathName.includes("/rm/") &&
        session.user.role.toString() !== RoleType.REGIONAL_MANAGER ? (
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
