"use client";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useToast } from "./ui/use-toast";
import { ChangePasswordSchema } from "@/app/schemas";
import { z } from "zod";
import { changePasswordAction } from "@/app/actions/user";
import { ChangePasswordForm } from "@/app/user-list/forms";
import { TbPasswordUser } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";

type FormValues = {
  password: string;
  confirmPassword: string;
};

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  username : string
};

const ChangePassword = ({ open, setOpen,username }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleFormSubmit = (formdata: z.infer<typeof ChangePasswordSchema>) => {
    console.log(formdata,username)
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
      <DialogContent className="sm:max-w-[450px]">
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

export default ChangePassword;
