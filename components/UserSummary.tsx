import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserSummary() {
  const session = await auth();
  if (!session) {
    redirect("/auth/login");
  }
  const profileImg = session.user.image
    ? `http://${process.env.NEXT_PUBLIC_MEDIA_URL}/media/${session.user.image}/`
    : "/man.png";
  const username = session.user.name || session.user.username;
  const subtitle = session.user.designation || session.user.role;
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
          <p className="font-semibold">{username}</p>
          <p className="text-[12px]">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
