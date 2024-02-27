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

interface MarkedTraderProps {
  name: keyof MarkedTraderPayloadType;
}

export async function MarkedTradersZoneWise({ name }: MarkedTraderProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full p-2">
          <ArchiveIcon className="h-4 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[600px] overflow-auto">
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
