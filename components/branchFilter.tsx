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

const branches = [
  {
    value: "1",
    label: "Agrabad",
  },
  {
    value: "2",
    label: "Principle",
  },
  {
    value: "3",
    label: "Sylhet",
  },
  {
    value: "4",
    label: "Khulna",
  },
  {
    value: "5",
    label: "Dhaka",
  },
];

export default function BranchFilter() {
  const [open, setOpen] = React.useState(false);
  const [branchState, setBranchState] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {branchState
            ? branches.find((branch) => branch.value === branchState)?.label
            : "Select Branch..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search branch..." className="h-9" />
          <CommandEmpty>No branch found.</CommandEmpty>
          <CommandGroup>
            {branches.map((branch) => (
              <CommandItem
                key={branch.value}
                value={branch.value}
                onSelect={(currentValue) => {
                  setBranchState(
                    currentValue === branchState ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                {branch.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    branchState === branch.value ? "opacity-100" : "opacity-0"
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
