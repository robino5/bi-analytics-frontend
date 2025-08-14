"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { successResponse } from "@/lib/utils";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IResponse } from "@/types/utils";
import { RoleType } from "@/app/schemas";
import { useBranchStore } from "@/lib/stores/branchStore";

export interface IBranchLov {
  branchCode: string;
  branchName: string;
}

interface IBranchFilterProps {
  onChange: (_branch: string) => void;
  currentBranch?: string;
}

export default function BranchFilter({
  onChange,
  currentBranch,
}: IBranchFilterProps) {
  const { data: session } = useSession();
  const [branchesList, setBranchesList] = useState<IBranchLov[]>([]);
  const [isRM, setIsRM] = useState(false);
  const pathName = usePathname();



  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/lov/branches/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<IBranchLov[]>;
        if (successResponse(result.status)) {
          setBranchesList(result.data);
          if (pathName.includes("/rm/")) {
            if (session?.user.role.toString() == RoleType.REGIONAL_MANAGER) {
              setIsRM(true);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);
  return (
    <Select
      onValueChange={(value) => onChange(value === "all" ? "" : value)}
      value={currentBranch ? String(currentBranch) : ""}
      disabled={isRM}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Branch" />
      </SelectTrigger>
      <SelectContent>
        {!pathName.includes("/rm/") && <SelectItem value="all">All Branch</SelectItem>}
        {branchesList.map((lov) => (
          <SelectItem key={lov.branchCode} value={String(lov.branchCode)}>
            {lov.branchName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
