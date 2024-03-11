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
import { useState } from "react";

const regionalMangers = [
  {
    value: "abdus.sobhan",
    name: "Abdus Sobhan",
  },
  {
    value: "abu.zahid",
    name: "Abu Zahid Md Zakaria",
  },
  {
    value: "ac_ho",
    name: "ac_ho",
  },
  {
    value: "adnan.hassan",
    name: "Adnan Hassan",
  },
  {
    value: "arif.khan",
    name: "Ariful Islam Khan",
  },
  {
    value: "bashed",
    name: "Bashed ",
  },
  {
    value: "demouser1",
    name: "demouser1",
  },
  {
    value: "demouser2",
    name: "demouser2",
  },
  {
    value: "demouser3",
    name: "demouser3",
  },
  {
    value: "dewan.mushfiqur",
    name: "Dewan Mushfiqur Rahman",
  },
  {
    value: "faraan.muhammad",
    name: "Faraan Muhammad",
  },
  {
    value: "gautam.kumar",
    name: "Gautam Kumar Datta Majumder",
  },
  {
    value: "hasnain.ahamed",
    name: "Hasnain Ahamed Ripon",
  },
  {
    value: "kamal.chandra",
    name: "Kamal Chandra Gosh",
  },
  {
    value: "lbsdealer",
    name: "lbsdealer",
  },
  {
    value: "mazharul.islam",
    name: "Mazharul Islam",
  },
  {
    value: "tariqul.alam",
    name: "Md Tariqul Alam",
  },
  {
    value: "md.karim",
    name: "Md. Abdul Karim",
  },
  {
    value: "rashad.remo",
    name: "Md. Afanoor Rashad Remo",
  },
  {
    value: "alauddin",
    name: "Md. Alauddin Khondker",
  },
  {
    value: "allama",
    name: "Md. Allama Iqbal",
  },
  {
    value: "amdadul.shaikat",
    name: "Md. Amdadul Haque Shaikat",
  },
  {
    value: "arifhossain",
    name: "Md. Arif Hossain",
  },
  {
    value: "islam.fakhrul",
    name: "Md. Fakhrul Islam",
  },
  {
    value: "mahmud.hossain1",
    name: "Md. Mahmud Hossain",
  },
  {
    value: "md.mosarraf",
    name: "Md. Mosarraf Hossain",
  },
  {
    value: "nabil.ibrahim",
    name: "Md. Nabil Ibrahim",
  },
  {
    value: "md.sabbir",
    name: "Md. Sabbir Mia",
  },
  {
    value: "sazzad.hossain",
    name: "Md. Sazzad Hossain",
  },
  {
    value: "reza",
    name: "Md. Shahin Reza",
  },
  {
    value: "touhid",
    name: "MD. TOUHIDUR RAHMAN MIAD",
  },
  {
    value: "md.yeasin",
    name: "Md. Yeasin",
  },
  {
    value: "mostafizur",
    name: "Md.Mostafizur rahman",
  },
  {
    value: "tanver.kabir",
    name: "Md.Tanver Kabir",
  },
  {
    value: "mohammad.shamim",
    name: "Mohammad Shamim",
  },
  {
    value: "hashem.khan",
    name: "Mohammed Abul Hashem Khan",
  },
  {
    value: "elahi",
    name: "MOHD. MAHMUD ELAHI",
  },
  {
    value: "muhammad.arafat",
    name: "Muhammad Arafat Hossain",
  },
  {
    value: "partho.shekhar",
    name: "Partho Shekhar Podder",
  },
  {
    value: "reg_south",
    name: "reg_south",
  },
  {
    value: "tanveer.hasan",
    name: "S. M. Tanveer Hasan",
  },
  {
    value: "sharif.quamrul",
    name: "Sharif Mohammad Quamrul Hasan Masum",
  },
  {
    value: "sheikh.sajjad",
    name: "Sheikh Sajjad Hossain",
  },
  {
    value: "surajit.ghosh",
    name: "Surajit Ghosh Durjoy",
  },
  {
    value: "syed.rezaul",
    name: "Syed Rezaul Karim",
  },
  {
    value: "saifur",
    name: "Syed Saifur Rahman",
  },
  {
    value: "taj.shahriar",
    name: "taj shahriar",
  },
  {
    value: "umama.arafa",
    name: "Umama Arafa Arabi",
  },
];

export default function RMFilter() {
  const [open, setOpen] = useState(false);
  const [manager, setManager] = useState("");
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
            ? regionalMangers.find((rm) => rm.value === manager)?.name
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
                  setManager(currentValue === manager ? manager : currentValue);
                  setOpen(false);
                }}
              >
                {rm.name}
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
