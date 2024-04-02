import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { IUser } from "@/types/user";
import { IResponse } from "@/types/utils";
import { Session } from "next-auth";
import { redirect, notFound } from "next/navigation";
import { UpdateUserForm } from "../forms";

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
  if (session.user.role !== "ADMIN") {
    if (session.user.username !== params.id) {
      redirect("/unauthorized");
    }
  }
  try {
    const user: any = await fetchUserByUserName(params.id, session);
    return (
      <div className="mx-4">
        <div className="grid w-screen/2 h-screen place-items-center">
          <div className="min-w-[480px]">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
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
