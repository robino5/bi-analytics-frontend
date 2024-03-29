"use client";

import PageHeader from "@/components/PageHeader";
import React, { useEffect, useState } from "react";
import { UserTable } from "./_datatable/_userDataTable";
import { useTableColumns } from "./_datatable/_userTableColumns";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
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

import { CreateUserForm } from "./forms";

const fetchUsers = async (session: Session) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      console.error(`error while fetching users`, await response.json());
    }
    const body = await response.json();
    return body.data.results;
  } catch (error) {
    console.error(error);
  }
};

const Users = () => {
  const { data: session } = useSession();

  if (!session) {
    redirect("/auth/login");
  }

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers(session);
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-4">
      <PageHeader name="User Mangement" />
      <div className="mt-4">
        <div className="mb-4">
          {/* Add User Dialoge */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <AiOutlinePlusCircle className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  create user as per requirements.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <CreateUserForm />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="p-4 space-y-4">
          <CardContent>
            <UserTable columns={useTableColumns} data={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
