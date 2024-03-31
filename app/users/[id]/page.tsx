import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { IUser } from "@/types/user";
import { IResponse } from "@/types/utils";
import { Session } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { UpdateUserForm } from "../forms";
import { UpdateUserSchema } from "@/app/schemas";

const fetchUserByUserName = async (username: string, session: Session) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_V1_APIURL}/auth/users/${username}/by-username/`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const body = (await response.json()) as IResponse<IUser>;
  if (body.code !== 200) {
    throw Error(body.message ?? "User Profile Fetch Error");
  }
  return body.data;
};

const UserProfile = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  try {
    const user: any = await fetchUserByUserName(params.id, session);
    return (
      <div className="mx-4">
        <div className="grid w-screen/7 h-screen place-items-center">
          <div className="max-w-[680px]">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>edit details of profile</CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateUserForm user={user} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default UserProfile;
