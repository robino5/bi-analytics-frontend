"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Download, ViewIcon } from "lucide-react";
import MarkedTraderDataTable, {
  MarkedTraderPayloadType,
} from "./_marked_traders_datatable";

interface MarkedTraderProps {
  name: keyof MarkedTraderPayloadType;
  branch?: string;
}

export function MarkedTradersZoneWise({ name, branch }: MarkedTraderProps) {
  const exportParams = new URLSearchParams({ investor_type: name });
  if (branch) {
    exportParams.set("branch", branch);
  }
  const exportUrl = `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/zonewise-investors/export/?${exportParams}`;

  return (
    <Dialog>
      {name !== "green" ? (
        <DialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-emerald-50 p-2"
          >
            <ViewIcon className="h-6 w-8 text-green-600 text-bold" />
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent
        className={cn(
          "w-[1300px] max-w-[96vw] max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[#033e4a]"
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-white">{`${name.toUpperCase()} TRADERS`}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            asChild
            variant="outline"
            className="gap-2 border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <a href={exportUrl} download={`${name}-traders.xlsx`}>
              <Download className="h-4 w-4" />
              Download Excel
            </a>
          </Button>
        </div>
        <MarkedTraderDataTable kind={name} branch={branch} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
