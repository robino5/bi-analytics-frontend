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
import { FormEvent, useEffect, useState, useTransition } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { HiMiniChevronUpDown } from "react-icons/hi2";

import { Session } from "next-auth";
import { CreateBulkRMSchema, CreateUserSchema } from "@/app/schemas";
import { cn, successResponse } from "@/lib/utils";
import { IUser } from "@/types/user";
import { IResponse } from "@/types/utils";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { TiChevronRightOutline } from "react-icons/ti";
import { createUserActionWithBulkUser } from "@/app/actions/user";

export interface IExistingTrader {
  traderId: string;
  traderName: string;
}

interface CreateUserFormProps {
  setOpen: (_value: boolean) => void;
  session: Session;
}

enum RoleType {
  ADMIN = "ADMIN",
  MANAGEMENT = "MANAGEMENT",
  BRANCH_MANGAER = "BRANCH_MANAGER",
  CLUSTER_MANAGER = "CLUSTER_MANAGER",
  REGIONAL_MANAGER = "REGIONAL_MANAGER",
}

export function CreateBulkRMForm({ session }: CreateUserFormProps) {
  const [isValid, setIsValid] = useState({
    users: false,
    password: false,
    role: false,
  });
  const [users, setUsers] = useState<IExistingTrader[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<string[]>([]);
  const form = useForm<z.infer<typeof CreateBulkRMSchema>>({
    resolver: zodResolver(CreateBulkRMSchema),
    defaultValues: {
      users: selectedPerson,
      password: "",
      role: RoleType.REGIONAL_MANAGER,
    },
  });

  function handleSelectedUsers(values: string[]) {
    if (values.includes("all")) {
      const defaultUsers = users.map((user) => user.traderId);
      form.setValue("users", defaultUsers);
      setSelectedPerson(defaultUsers);
      return;
    }
    form.setValue("users", values);
    setSelectedPerson(values);
  }

  function onSubmit(data: z.infer<typeof CreateBulkRMSchema>) {
    if (!data.users.length) {
      form.setError("users", { message: "minium 1 item is required !" });
      setIsValid((prevState) => ({ ...prevState, users: false }));
    } else {
      form.clearErrors("users");
      setIsValid((prevState) => ({ ...prevState, users: true }));
    }
    createUserActionWithBulkUser(data);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/noaccounts/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<IExistingTrader[]>;
        if (successResponse(result.status)) {
          setUsers(result.data);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="users"
            render={() => (
              <TraderListBox
                users={users}
                onChange={handleSelectedUsers}
                selected={selectedPerson}
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
          <Button type="submit" disabled={!isValid}>
            Save <TiChevronRightOutline className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </Form>
    </>
  );
}

interface ITraderListProps {
  users: IExistingTrader[];
  selected: string[];
  onChange: (_value: string[]) => void;
}

function TraderListBox({ users, selected, onChange }: ITraderListProps) {
  return (
    <>
      <Listbox name="users" value={selected} onChange={onChange} multiple>
        <div className="space-y-3">
          <Listbox.Label
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              { "text-red-500": !selected.length }
            )}
          >
            Traders<span className="text-red-600">*</span>:
          </Listbox.Label>
          <div className="relative z-10">
            <Listbox.Button className="flex h-9 w-[445px] items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
              <span className="block truncate">
                {selected.map((person) => person).join(" | ")}
              </span>
              <HiMiniChevronUpDown
                className="h-5  w-5 text-gray-600 opacity-50"
                aria-hidden="true"
              />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                <Listbox.Option
                  key="all"
                  value="all"
                  className="relative cursor-default select-none py-2 pl-10 pr-4"
                >
                  Select All
                </Listbox.Option>
                {users.map((person: IExistingTrader, personIdx: number) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={person.traderId}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.traderName}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
          <FormMessage />
        </div>
      </Listbox>
    </>
  );
}
