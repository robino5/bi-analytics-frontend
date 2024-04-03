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
import { useEffect, useState } from "react";

export interface ITrader {
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
  const currentUser = session.user.username;
  const pathName = usePathname();

  return (
    <Select
      onValueChange={onChange}
      defaultValue={"all"}
      value={currentTrader}
      disabled={traderLocked}
    >
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
