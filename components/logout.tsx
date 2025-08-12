import { useTransition } from "react";
import { LogOut } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/login";

export default function LogoutForm() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      localStorage.setItem(
        "branch-storage",
        JSON.stringify({ state: { branch: "" }, version: 0 })
      );
        localStorage.setItem(
        "branch-storage",
        JSON.stringify({ state: { branch: "" }, version: 0 })
      );
      await logoutAction();
    });
  };

  return (
    <form onSubmit={handleLogout}>
      {isPending ? (
        <Button className="text-lg w-[270px]" variant="destructive" disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please Wait...
        </Button>
      ) : (
        <Button type="submit" variant="destructive" className="text-lg w-[270px]">
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      )}
    </form>
  );
}
