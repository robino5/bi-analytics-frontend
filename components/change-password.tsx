"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TbPasswordUser } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import { useToast } from "@/components/ui/use-toast";

import { ChangePasswordSchema } from "@/app/schemas";
import { ChangePasswordForm } from "@/app/users/forms";
import { changePasswordAction } from "@/app/actions/user";

interface ChangePasswordProps {
  username: string;
}

const ChangePasswordModal = ({ username }: ChangePasswordProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFormSubmit = (formdata: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(async () => {
      const event = await changePasswordAction(username, formdata);
      if (event.status === "success") {
        toast({
          description: event.message,
        });
        setOpen(false);
      } else {
        console.error(event);
        toast({
          variant: "destructive",
          description: event.message,
        });
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          <TbPasswordUser className="h-4 w-4 mr-2" />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-start items-center">
              <TbPasswordUser className="h-4 w-4 mr-2" /> Update Password
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex justify-start items-center">
              <RiErrorWarningLine className="h-4 w-4 mr-2 text-rose-400" />{" "}
              Sharing passwords on broadcast channel is prohibited.
            </div>
          </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm
          handleSubmit={handleFormSubmit}
          submitPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
