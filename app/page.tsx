import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  DEFAULT_ADMIN_REDIRECT,
  DEFAULT_MANAGEMENT_REDIRECT,
  DEFAULT_RM_REDIRECT,
} from "@/routes";
import HomeClient from "@/components/HomeClient";


export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const role = session.user.role;
  const token = session.user.accessToken

  if (["ADMIN", "MANAGEMENT"].includes(role)) {
    return <HomeClient redirectUrl={DEFAULT_ADMIN_REDIRECT} role={role} accessToken={token} />;
  }
  if (["BRANCH_MANAGER", "CLUSTER_MANAGER"].includes(role)) {
    return <HomeClient redirectUrl={DEFAULT_MANAGEMENT_REDIRECT} role={role} accessToken={token} />;
  }
  if (["REGIONAL_MANAGER"].includes(role)) {
    return <HomeClient redirectUrl={DEFAULT_RM_REDIRECT} role={role} accessToken={token} />;
  }

  return <HomeClient redirectUrl="/auth/login" role="unknown" accessToken="unknown" />;
}
