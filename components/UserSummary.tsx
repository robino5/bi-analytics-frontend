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
    ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/media/${session.user.image}/`
    : "/man.png";
  const username = session.user.name || session.user.username;
  const subtitle = session.user.designation || session.user.role;
  return (
    <Link href={`/users/${session?.user.username}`}>
      <div className="flex justify-start items-center bg-card p-2 rounded-[10px] hover:bg-ring cursor-pointer">
        <div>
          <Avatar>
            <AvatarImage src={profileImg} />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase() ?? "LB"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grow-2 w-full ml-2">
          <p className="font-semibold green:text-white">{username}</p>
          <p className="text-[12px] green:text-white">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
