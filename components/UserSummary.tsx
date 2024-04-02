import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";

export default async function UserSummary() {
  const session = await auth();
  const profileImg = session?.user.image
    ? `http://${process.env.NEXT_PUBLIC_MEDIA_URL}/media/${session.user.image}/`
    : "/man.png";
  return (
    <Link href={`/users/${session?.user.username}`}>
      <div className="flex justify-start items-center bg-gray-200 p-2 rounded-[10px] hover:bg-gray-300 cursor-pointer">
        <div>
          <Avatar>
            <AvatarImage src={profileImg} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase() ?? "LB"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grow-2 w-full ml-2">
          <p className="font-semibold">
            {session?.user?.name ?? session?.user.username}
          </p>
          <p className="text-[12px]">{session?.user?.designation ?? session?.user.role}</p>
        </div>
      </div>
    </Link>
  );
}
