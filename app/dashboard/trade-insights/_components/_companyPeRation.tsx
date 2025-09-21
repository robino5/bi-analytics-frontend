"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import CompanyPeChart from "./CompanyPeChart";

interface CompanyPeRationBoardProps {
  sectorwiseTrunoverComparison?: any;
  companyPiRation?: any;
}

const CompanyPeRationBoard: React.FC<CompanyPeRationBoardProps> = ({
  sectorwiseTrunoverComparison,
  companyPiRation,
}) => {
  const data = companyPiRation?.CompareMarket[0] ?? [];
  const defaultValue = sectorwiseTrunoverComparison?.data?.[0]?.name;

  const [open, setOpen] = React.useState(false);
  const [selectedObj, setSelectedObj] = React.useState<any>(
    data.find((item: any) => item.StockName === defaultValue) || null
  );
  return (
    <div className="space-y-5">
      <div className="w-[250px]">
        <Popover open={open} onOpenChange={setOpen} >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedObj ? selectedObj.StockName : "Select a stock..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search stock..." />
              <CommandList>
                <CommandEmpty>No stock found.</CommandEmpty>
                <CommandGroup>
                  {data.map((item: any, idx: number) => (
                    <CommandItem
                      key={idx}
                      value={item.StockName}
                      onSelect={() => {
                        setSelectedObj(item);
                        setOpen(false);
                      }}
                    >
                      {item.StockName}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <CompanyPeChart selectedObj={selectedObj} colorArray={["#4facfe", "#43e97b", "#fa709a"]} />
    </div>
  );
};

export default CompanyPeRationBoard;
