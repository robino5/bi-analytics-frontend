import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

import { signOut } from "@/auth";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        type="submit"
        variant={"destructive"}
        className="text-lg w-[270px]"
      >
        <LogOut className="h-4 w-4 mr-2" /> Logout
      </Button>
    </form>
  );
};

export default Logout;
