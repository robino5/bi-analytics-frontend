"use client";

import PageHeader from "@/components/PageHeader";
import React, { useEffect, useState } from "react";
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
    return body.data;
  } catch (error) {
    console.error(error);
  }
};

const Users = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  if (!session) {
    redirect("/auth/login");
  }

  const [users, setUsers] = useState<IUser[]>([]);
  const [newUserOpen, setNewUserOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers(session);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-4">
      <PageHeader name="User Mangement" />
      <div className="mt-4">
        <Card className="p-4 space-y-4">
          <CardHeader className="relative">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage access control of users</CardDescription>
            </div>
            <div className="absolute top-0 right-0 flex gap-4">
              <div className="mb-4">
                {/* Add User Dialoge */}
                <Dialog open={newUserOpen} onOpenChange={setNewUserOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <AiOutlinePlusCircle className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        create user as per requirements.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <CreateUserForm
                        setOpen={setNewUserOpen}
                        session={session}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mb-4">
                {/* Add User Bulk Dialoge */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default">
                      <HiOutlineUsers className="h-4 w-4 mr-2" />
                      Create From Existing RM
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create RM Profiles</DialogTitle>
                      <DialogDescription>
                        create traders profile in bulk format. share a common
                        password. You're advised to give role carefully.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <CreateBulkRMForm
                        setOpen={setNewUserOpen}
                        session={session}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UserTable
              columns={useTableColumns}
              data={users}
              fetching={loading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Users;
