"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./_userTableHeader";
import { IUser } from "@/types/user";
import { DataTableRowActions } from "./_userTableRowActions";

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
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="text-slate-600 font-medium">
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    accessorKey: "profile.branchName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) =>
      row.getValue("isActive") === true ? (
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
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Login" />
    ),
    cell: ({ row }) => {
      const timestamp = new Date(row.getValue("lastLogin"));
      return timestamp.toISOString();
    },
  },
  {
    id: "signedInToday",
    accessorKey: "lastLogin",
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
        <Badge variant="outline" className="bg-green-50">
          Yes
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-red-50">
          No
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
