import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";

export default async function UserSummary() {
  const session = await auth();

  return (
    <Link href={`/users/${session?.user.username}`}>
      <div className="flex justify-start items-center bg-gray-200 p-2 rounded-[10px] hover:bg-gray-300 cursor-pointer">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase() ?? "LB"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grow-2 w-full ml-2">
          <p className="font-semibold">{session?.user?.name}</p>
          <p className="text-[12px]">{session?.user?.designation || ""}</p>
        </div>
      </div>
    </Link>
  );
}
