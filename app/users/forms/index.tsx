"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createUserAction, updateUserAction } from "@/app/actions/user";
import { CreateUserSchema, UpdateUserSchema } from "@/app/schemas";
import { FormEvent, useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CiSaveUp1 } from "react-icons/ci";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";

enum RoleType {
  ADMIN = "ADMIN",
  MANAGEMENT = "MANAGEMENT",
  BRANCH_MANGAER = "BRANCH_MANAGER",
  CLUSTER_MANAGER = "CLUSTER_MANAGER",
  REGIONAL_MANAGER = "REGIONAL_MANAGER",
}

interface CreateUserFormProps {
  setOpen: (_open: boolean) => void;
  session: Session;
}

interface UpdateUserFormProps {
  user: z.infer<typeof UpdateUserSchema>;
}

export function CreateUserForm({ setOpen, session }: CreateUserFormProps) {
  const [isValid, setIsValid] = useState({ username: false });
  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: RoleType.REGIONAL_MANAGER,
      isActive: true,
    },
  });

  function onSubmit(values: z.infer<typeof CreateUserSchema>) {
    createUserAction(values);
    setOpen(false);
  }

  function handleUsernameChange(e: FormEvent<HTMLInputElement>) {
    form.setValue("username", e.currentTarget.value);
    fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/${e.currentTarget.value}/by-username/`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        form.setError("username", { message: "Username already exists !" });
        setIsValid((prevState) => ({ ...prevState, username: false }));
      } else {
        form.clearErrors("username");
        setIsValid((prevState) => ({ ...prevState, username: true }));
      }
    });
  }
  const isFormValid = Object.values(isValid).every((val) => val);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    onChange={handleUsernameChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn@testme.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                User Role<span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RoleType).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="isActive">
                  Active<span className="text-red-500">*</span>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isFormValid}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      profile: {
        branchId: user.profile.branchId ?? "",
        designation: user.profile.designation,
      },
    },
  });

  function updateSubmit(values: z.infer<typeof UpdateUserSchema>) {
    startTransition(async () => {
      const res = await updateUserAction(values);
      if (res.status === "success") {
        toast({
          description: res.message,
        });
      } else {
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateSubmit)} className="space-y-8">
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl className="w-full">
                  <Input {...field} value={user.username} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="w-full">
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                User Role<span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={user.role}
                disabled={user.role.toString() !== "ADMIN"}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(RoleType).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Switch
                    id="isActive"
                    onCheckedChange={field.onChange}
                    defaultChecked={user.isActive}
                    disabled={user.role.toString() !== "ADMIN"}
                  />
                </FormControl>
                <FormLabel htmlFor="isActive">
                  Active<span className="text-red-500">*</span>
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-slate-700 font-semibold text-xl">
          Profile Details
        </div>
        <div className="flex space-x-4 space-y-0">
          <FormField
            control={form.control}
            name="profile.designation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Designation</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={user.role.toString() !== "ADMIN"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile.branchId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={user.role.toString() !== "ADMIN"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isPending ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Saving
          </Button>
        ) : (
          <Button type="submit" variant="default">
            <CiSaveUp1 className="h-5 w-5 mr-2" /> Save
          </Button>
        )}
      </form>
    </Form>
  );
}
