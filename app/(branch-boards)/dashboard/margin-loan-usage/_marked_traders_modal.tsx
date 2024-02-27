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

async function fetchMarkedTraders() {
  return [];
}

export async function MarkedTradersZoneWise(props: any) {
  const exposureName: string = props.name;
  const traders = await fetchMarkedTraders();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full p-2">
          <ArchiveIcon className="h-4 w-6"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{exposureName.toUpperCase()}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
          doloremque facilis aliquid eligendi eveniet? Aliquid quibusdam sit
          magnam, quod minima aperiam excepturi sapiente? Ratione, cupiditate
          provident! Amet necessitatibus quis atque.
        </p>
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
