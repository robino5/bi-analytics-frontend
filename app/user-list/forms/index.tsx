"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  ChangePasswordSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from "@/app/schemas";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CiSaveUp1 } from "react-icons/ci";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import { IBranchLov } from "@/components/branchFilter";
import { IResponse } from "@/types/utils";
import { successResponse } from "@/lib/utils";

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
  session: Session;
}

interface ChangePaswwordFormProps {
  handleSubmit: (_open: any) => void;
  submitPending: boolean;
}

export function CreateUserForm({ setOpen, session }: CreateUserFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
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
    startTransition(async () => {
      const res = await createUserAction(values);
      if (res.status === "success") {
        toast({
          description: res.message,
        });
        setOpen(false);
      } else {
        console.error(res);
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    });
  }

  function handleUsernameChange(e: FormEvent<HTMLInputElement>) {
    form.setValue("username", e.currentTarget.value);
    fetch(
      `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/${e.currentTarget.value}/`,
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
        {isPending ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please Wait...
          </Button>
        ) : (
          <Button type="submit" disabled={!isFormValid}>
            <CiSaveUp1 className="h-5 w-5 mr-2" /> Create
          </Button>
        )}
      </form>
    </Form>
  );
}

export function UpdateUserForm({ user, session }: UpdateUserFormProps) {
  const [isPending, startTransition] = useTransition();
  const [editable, _] = useState(session.user.role === RoleType.ADMIN);
  const [branches, setBranches] = useState<IBranchLov[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
        branchId: user.profile?.branchId?.toString(),
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
        console.error(res);
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
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
          setBranches(result.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching branches:", error);
        setIsLoading(false);
      }
    };
    fetchBranches();
  }, [user]);

  return (
    <Form {...form}>
      {isLoading ? (
        <div role="status" className="w-full flex justify-center items-center">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500 text-center"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
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
                  defaultValue={field.value}
                  disabled={!editable}
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
                      disabled={!editable}
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
              name="profile.branchId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Branch</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={!editable}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Assign a Branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem
                          key={branch.branchCode}
                          value={branch.branchCode.toString()}
                        >
                          {branch.branchName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Can only be managed by Admin.
                  </FormDescription>
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
            <Button type="submit">
              <CiSaveUp1 className="h-5 w-5 mr-2" /> Save
            </Button>
          )}
        </form>
      )}
    </Form>
  );
}

export const ChangePasswordForm = ({
  handleSubmit,
  submitPending,
}: ChangePaswwordFormProps) => {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password*</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitPending ? (
          <Button variant="destructive" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please Wait...
          </Button>
        ) : (
          <Button type="submit" variant="destructive">
            Save Changes
          </Button>
        )}
      </form>
    </Form>
  );
};
