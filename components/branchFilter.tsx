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
import { LovResultType } from "@/lib/types";
import { useEffect, useState } from "react";

const ALL_BRANCHES = [
  {
    value: 1,
    name: "Principal",
  },
  {
    value: 2,
    name: "Agrabad",
  },
  {
    value: 3,
    name: "Khatungonj",
  },
  {
    value: 4,
    name: "Sylhet",
  },
  {
    value: 5,
    name: "Banani",
  },
  {
    value: 6,
    name: "Dhanmondi",
  },
  {
    value: 7,
    name: "Nasirabad",
  },
  {
    value: 8,
    name: "Comilla",
  },
  {
    value: 9,
    name: "Narayangonj",
  },
  {
    value: 10,
    name: "Uttara",
  },
  {
    value: 11,
    name: "A.A. Bhaban Booth",
  },
  {
    value: 12,
    name: "Corporate",
  },
  {
    value: 13,
    name: "Barisal",
  },
  {
    value: 14,
    name: "Feni",
  },
  {
    value: 15,
    name: "Mirpur",
  },
  {
    value: 16,
    name: "Bashundhara",
  },
  {
    value: 17,
    name: "Gulshan",
  },
  {
    value: 18,
    name: "Jubilee Road",
  },
  {
    value: 19,
    name: "Khulna",
  },
  {
    value: 20,
    name: "Dhanmondi-27",
  },
  {
    value: 21,
    name: "Jessore",
  },
  {
    value: 27,
    name: "Hathazari",
  },
  {
    value: 28,
    name: "Tangail",
  },
  {
    value: 29,
    name: "Chawkbazar",
  },
  {
    value: 30,
    name: "Bogra",
  },
  {
    value: 31,
    name: "Gazipur",
  },
  {
    value: 32,
    name: "Rajshahi",
  },
  {
    value: 33,
    name: "Elephant Road",
  },
  {
    value: 34,
    name: "Bangshal",
  },
  {
    value: 35,
    name: "Kushtia",
  },
  {
    value: 36,
    name: "Mirpur-1",
  },
  {
    value: 37,
    name: "Bahaddar Hat",
  },
  {
    value: 38,
    name: "Kafco",
  },
  {
    value: 39,
    name: "Hazari Golli",
  },
  {
    value: 40,
    name: "Madaripur",
  },
  {
    value: 41,
    name: "Narsingdi",
  },
];



export default function BranchFilter() {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranch] = useState<LovResultType[]>([]);
  const [managers, setManager] = useState<LovResultType[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        // const response = await fetch('your-api-endpoint-for-branches');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch branches');
        // }
        // const data = await response.json();
        setBranch(ALL_BRANCHES);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    if (data) {
      fetchBranches();
    }
  }, [data]);

  useEffect(() => {
    console.log("Selected branch changed:", selectedBranch);
  }, [selectedBranch]);


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
            ? branches.find((branch) => branch.value.toString() === selectedBranch)
                ?.name
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
                value={branch.value.toString()}
                onSelect={(currentValue) => {
                  setSelectedBranch(
                    currentValue === selectedBranch ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                {branch.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedBranch === branch.value.toString()
                      ? "opacity-100"
                      : "opacity-0"
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
