"use client";

import PageHeader from "@/components/PageHeader";
import React, { useEffect, useState, useCallback } from "react";
import { UserTable } from "./_datatable/_userDataTable";
import { useTableColumns } from "./_datatable/_userTableColumns";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ColumnFiltersState } from "@tanstack/react-table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";

import { CreateUserForm } from "./forms";
import { IUser } from "@/types/user";
import { CreateBulkRMForm } from "./forms/create-existing-trader-form";

const fetchUsers = async (
  session: Session,
  pagination: { pageIndex: number; pageSize: number; filterUrl: string }
) => {
  const { pageIndex, pageSize, filterUrl } = pagination;

  const query = new URLSearchParams({
    page: (pageIndex + 1).toString(),
    page_size: pageSize.toString(),
  }).toString();

  const fullQuery = filterUrl ? `${query}&${filterUrl}` : query;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/?${fullQuery}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      console.error("Error while fetching users", await response.json());
    }

    const body = await response.json();
    console.log("responce", body.data);
    return body.data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

const Users = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [filterUrl, setFilterUrl] = useState<string>("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  if (!session) {
    redirect("/auth/login");
  }

  const [users, setUsers] = useState<IUser[]>([]);
  const [newUserOpen, setNewUserOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (!session) return;

    setLoading(true);
    try {
      const data = await fetchUsers(session, { ...pagination, filterUrl });
      setUsers(data.results);
      setTotalRows(data.count);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [session, pagination, filterUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mx-4">
      <PageHeader name="User Mangement" />
      <div className="mt-4">
        <Card className="p-4 space-y-4 bg-[#0e5e6f]">
          <CardHeader className="relative ">
            <div>
              <CardTitle className="text-white">Manage access control of users</CardTitle>
              {/* <CardDescription className="text-white">
                Manage access control of users
              </CardDescription> */}
            </div>
          </CardHeader>
          <CardContent>
            <UserTable
              columns={useTableColumns}
              data={users}
              fetching={loading}
              pagination={pagination}
              setPagination={setPagination}
              totalRows={totalRows}
              setFilterUrl={setFilterUrl}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
