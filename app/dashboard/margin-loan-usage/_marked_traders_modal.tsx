"use  client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ViewIcon } from "lucide-react";
import MarkedTraderDataTable, {
  MarkedTraderPayloadType,
} from "./_marked_traders_datatable";
import { cn } from "@/lib/utils";

interface MarkedTraderProps {
  name: keyof MarkedTraderPayloadType;
  branch?: string;
}

export function MarkedTradersZoneWise({ name, branch }: MarkedTraderProps) {
  return (
    <Dialog>
      {name !== "green" ? (
        <DialogTrigger asChild>
          <Button size="icon" variant="outline" className="rounded-full p-2 bg-emerald-50">
            <ViewIcon className="h-6 w-8 text-green-600 text-bold" />
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent
        className={cn("sm:max-w-[1100px] max-h-[600px] overflow-auto bg-[#033e4a]" , {})}
      >
        <DialogHeader>
          <DialogTitle className="text-white">{`${name.toUpperCase()} TRADERS`}</DialogTitle>
          {/* <DialogDescription>
            {`all the ${name} traders list.`}
          </DialogDescription> */}
        </DialogHeader>
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
