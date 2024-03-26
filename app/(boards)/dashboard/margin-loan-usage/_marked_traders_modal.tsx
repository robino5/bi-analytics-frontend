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
import { ArchiveIcon } from "lucide-react";
import MarkedTraderDataTable, {
  MarkedTraderPayloadType,
} from "./_marked_traders_datatable";
import { cn } from "@/lib/utils";

interface MarkedTraderProps {
  name: keyof MarkedTraderPayloadType;
}

export function MarkedTradersZoneWise({ name }: MarkedTraderProps) {
  return (
    <Dialog>
      {name !== "green" ? (
        <DialogTrigger asChild>
          <Button size="icon" variant="outline" className="rounded-full p-2">
            <ArchiveIcon className="h-4 w-6" />
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent
        className={cn(
          "sm:max-w-[700px] max-h-[600px] overflow-auto",
          {
            "bg-gradient-to-tl from-red-50 to-red-100": name === "red",
          },
          {
            "bg-gradient-to-tl from-yellow-50 to-yellow-100": name === "yellow",
          }
        )}
      >
        <DialogHeader>
          <DialogTitle>{`${name.toUpperCase()} TRADERS`}</DialogTitle>
          <DialogDescription>
            {`all the ${name} traders list.`}
          </DialogDescription>
        </DialogHeader>
        <MarkedTraderDataTable kind={name} />
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
