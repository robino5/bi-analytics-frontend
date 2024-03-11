"use client";

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

import { useSession } from "next-auth/react";
import { useState } from "react";

interface IBranchLov {
  id: string;
  name: string;
}

const branchesList: IBranchLov[] = [
  {
    id: "1",
    name: "Principal",
  },
  {
    id: "2",
    name: "Agrabad",
  },
  {
    id: "3",
    name: "Khatungonj",
  },
  {
    id: "4",
    name: "Sylhet",
  },
  {
    id: "5",
    name: "Banani",
  },
  {
    id: "6",
    name: "Dhanmondi",
  },
  {
    id: "7",
    name: "Nasirabad",
  },
  {
    id: "8",
    name: "Comilla",
  },
  {
    id: "9",
    name: "Narayangonj",
  },
];

interface IBranchFilterProps {
  onChange: (branch: string) => void;
}

export default function BranchFilter({ onChange }: IBranchFilterProps) {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedBranch
            ? branchesList.find((branch) => branch.id === selectedBranch)?.name
            : "Select Branch"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="search branch" className="h-9" />
          <CommandEmpty>No branch found.</CommandEmpty>
          <CommandGroup>
            {branchesList.map((branch) => (
              <CommandItem
                key={branch.id}
                value={branch.id}
                onSelect={(currentBranch) => {
                  setSelectedBranch(currentBranch);
                  onChange(currentBranch);
                  setOpen(false);
                }}
              >
                {branch.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedBranch === branch.id ? "opacity-100" : "opacity-0"
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
