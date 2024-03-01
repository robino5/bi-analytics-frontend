"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const regionalMangers = [
  {
    value: "user1",
    label: "User 1",
  },
  {
    value: "user2",
    label: "User 2",
  },
  {
    value: "user3",
    label: "User 3",
  },
  {
    value: "user4",
    label: "User 4",
  },
  {
    value: "user5",
    label: "User 5",
  },
  {
    value: "user6",
    label: "User 6",
  },
];

export default function RMFilter() {
  const [open, setOpen] = React.useState(false);
  const [manager, setManager] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {manager
            ? regionalMangers.find((rm) => rm.value === manager)?.label
            : "Select RM..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search RM..." className="h-9" />
          <CommandEmpty>No RM found.</CommandEmpty>
          <CommandGroup>
            {regionalMangers.map((rm) => (
              <CommandItem
                key={rm.value}
                value={rm.value}
                onSelect={(currentValue) => {
                  setManager(currentValue === manager ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {rm.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    manager === rm.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
