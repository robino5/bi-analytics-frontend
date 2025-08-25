"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./_userTableHeader";
import { IUser } from "@/types/user";
import { DataTableRowActions } from "./_userTableRowActions";
import { format, parseISO } from 'date-fns';

export const useTableColumns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => (
      <div className="font-bold">{row.getValue("username")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "role",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableColumnFilter: true,
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="text-slate-600 font-medium dark:text-gray-300"
      >
        {row.getValue("role")=="REGIONAL_MANAGER"?"RM":row.getValue("role")}
      </Badge>
    ),
  },
  {
    id: "branch",
    accessorKey: "profile.branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableColumnFilter: true,
  },
  {
    id: "active",
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) =>
      row.getValue("active") === true ? (
        <Badge
          variant="default"
          className="bg-emerald-100 text-green-600 font-bold"
        >
          ACTIVE
        </Badge>
      ) : (
        <Badge variant="default" className="bg-rose-100 text-red-600 font-bold">
          LOCKED
        </Badge>
      ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Login" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("lastLogin");
   if (value) {
  const timestampValue = row.getValue("lastLogin");
  if (typeof timestampValue === "string") {
    const formatted = format(parseISO(timestampValue), "dd-MMM-yyyy hh:mm:ss a")
    return formatted; 
  }
  return ""; 
}
      return <span className="text-rose-500 font-bold">Never</span>;
    },
  },
  {
    id: "signedInToday",
    accessorFn: (data, _) => {
      const timestamp = new Date(data?.lastLogin ?? "");
      const today = new Date();
      const isToday =
        timestamp.getDate() === today.getDate() &&
        timestamp.getMonth() === today.getMonth() &&
        timestamp.getFullYear() === today.getFullYear();
      return isToday ? "Yes" : "No";
    },
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Signed In Today ?" />
    ),
    cell: ({ row }) => {
      const timestamp = new Date(row.getValue("lastLogin"));
      const today = new Date();
      // Check if the timestamp is today
      const isToday =
        timestamp.getDate() === today.getDate() &&
        timestamp.getMonth() === today.getMonth() &&
        timestamp.getFullYear() === today.getFullYear();

      // Return "Yes" if the timestamp is today, otherwise return "No"
      return isToday ? (
        <Badge variant="outline">Yes</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
