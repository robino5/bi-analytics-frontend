"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

import { logoutAction } from "@/app/actions/login";

import { ReloadIcon } from "@radix-ui/react-icons";

const Logout = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={() => startTransition(async () => logoutAction())}>
      {isPending ? (
        <Button className="text-lg w-[270px]" variant={"destructive"} disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button
          type="submit"
          variant={"destructive"}
          className="text-lg w-[270px]"
        >
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      )}
    </form>
  );
};

export default Logout;
