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

export interface IBranchLov {
  branchCode: string;
  branchName: string;
}

interface IBranchFilterProps {
  onChange: (branch: string) => void;
}

export default function BranchFilter({ onChange }: IBranchFilterProps) {
  const [branchesList, setBranchesList] = useState<IBranchLov[]>([]);
  useEffect(() => {
    const fetchBranches = async () => {
      const session = await getSession();
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_V1_APIURL}/lov/branches/`, {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const result = (await response.json()) as IResponse<IBranchLov>;
        if (successResponse(result.status)) {
          setBranchesList(result.data);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a branch" />
      </SelectTrigger>
      <SelectContent>
        {branchesList.map((lov) => (
          <SelectItem value={lov.branchCode}>{lov.branchName}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
