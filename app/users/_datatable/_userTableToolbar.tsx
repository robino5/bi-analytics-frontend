"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./_userTableOptions";
import { DataTableFacetedFilter } from "./_userDataTableFacetedFilter";
import { useEffect, useMemo, useState } from "react";
import { getSession } from "next-auth/react";
import { IBranchLov } from "@/components/branchFilter";
import { IResponse } from "@/types/utils";
import { successResponse } from "@/lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

// TODO: Need to by dynamic
export const roles = [
  {
    value: "ADMIN",
    label: "ADMIN",
  },
  {
    value: "CLUSTER_MANAGER",
    label: "CLUSTER_MANAGER",
  },
  {
    value: "BRANCH_MANAGER",
    label: "BRANCH_MANAGER",
  },
  {
    value: "REGIONAL_MANAGER",
    label: "REGIONAL_MANAGER",
  },
  {
    value: "MANAGEMENT",
    label: "MANAGEMENT",
  },
];

export const SignedInTodayItems = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

const parseBranches = (branchList: IBranchLov[]) => {
  return branchList.map((branch) => ({
    label: branch.branchName,
    value: branch.branchName,
  }));
};

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [branchList, setBranchList] = useState<IBranchLov[]>([]);
  const branches = useMemo(() => parseBranches(branchList), [branchList]);

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
          setBranchList(result.data);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by username..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("branch") && (
          <DataTableFacetedFilter
            column={table.getColumn("branch")}
            title="Branch"
            options={branches}
          />
        )}
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="Role"
            options={roles}
          />
        )}
        {table.getColumn("signedInToday") && (
          <DataTableFacetedFilter
            column={table.getColumn("signedInToday")}
            title="Logged-In Today ?"
            options={SignedInTodayItems}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
