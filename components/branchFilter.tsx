"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { successResponse } from "@/lib/utils";

import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface IBranchLov {
  branchCode: string;
  branchName: string;
}

interface IBranchFilterProps {
  onChange: (branch: string) => void;
  currentBranch?: string;
}

export default function BranchFilter({
  onChange,
  currentBranch,
}: IBranchFilterProps) {
  const [branchesList, setBranchesList] = useState<IBranchLov[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const pathName = usePathname();

  const setDefaultBranch = (branchCode: string) => {
    setSelectedBranch(branchCode);
    onChange(branchCode);
  };

  useEffect(() => {
    const fetchBranches = async () => {
      const session = await getSession();
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
          // for RM Routes need to have default selected branch
          if (pathName.includes("/rm/")) {
            setDefaultBranch(result.data[0]?.branchCode || "");
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
      onValueChange={onChange}
      defaultValue={selectedBranch}
      value={currentBranch ?? ""}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent>
        {branchesList.map((lov) => (
          <SelectItem key={lov.branchCode} value={lov.branchCode}>
            {lov.branchName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
