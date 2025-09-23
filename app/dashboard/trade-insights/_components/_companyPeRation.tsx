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
import { tradeInsightAPI } from "../api";
import { useQuery } from "@tanstack/react-query";
import RsiProgressBar from "@/components/RsiProgressBar";
import { SkeletonStatisticsRatio } from "@/components/skeletonCard";

interface CompanyPeRationBoardProps {
  sectorwiseTrunoverComparison?: any;
  companyPiRation?: any;
}

const CompanyPeRationBoard: React.FC<CompanyPeRationBoardProps> = ({
  sectorwiseTrunoverComparison,
  companyPiRation,
}) => {
  const data = companyPiRation?.items ?? [];
  const defaultValue = sectorwiseTrunoverComparison?.data?.[0]?.name;

  const [open, setOpen] = React.useState(false);
  const [selectedObj, setSelectedObj] = React.useState<any>(
    data.find((item: any) => item.mkistaT_INSTRUMENT_CODE === defaultValue) ||
      null
  );

  const { data: companyPeRSI, isLoading } = useQuery({
    queryKey: ["companyPeRSI", selectedObj?.companyID],
    queryFn: () => tradeInsightAPI.getCompanyPERSI(selectedObj.companyID),
  });

  console.log("companyPeRSI", companyPeRSI);

  if (isLoading) {
    return <SkeletonStatisticsRatio />;
  }

  return (
    <div className="space-y-5">
      {/* Dropdown */}
      <div className="w-[250px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedObj
                ? selectedObj.mkistaT_INSTRUMENT_CODE
                : "Select a stock..."}
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
                      value={item.mkistaT_INSTRUMENT_CODE}
                      onSelect={() => {
                        setSelectedObj(item);
                        setOpen(false);
                      }}
                    >
                      {item.mkistaT_INSTRUMENT_CODE}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Chart */}
      {companyPeRSI && (
        <CompanyPeChart
          companyPeRSI={companyPeRSI}
          colorArray={["#4facfe", "#43e97b", "#fa709a"]}
        />
      )}

      {/* RSI Progress */}
      {companyPeRSI?.rsi !== null && (
        <RsiProgressBar value={companyPeRSI?.rsi} />
      )}
    </div>
  );
};

export default CompanyPeRationBoard;
