import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  DEFAULT_ADMIN_REDIRECT,
  DEFAULT_MANAGEMENT_REDIRECT,
  DEFAULT_RM_REDIRECT,
} from "@/routes";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const role = session.user.role;

  if (["ADMIN", "MANAGEMENT"].includes(role)) {
    redirect(DEFAULT_ADMIN_REDIRECT);
  }
  if (["BRANCH_MANAGER", "CLUSTER_MANAGER"].includes(role)) {
    redirect(DEFAULT_MANAGEMENT_REDIRECT);
  }
  if (["REGIONAL_MANAGER"].includes(role)) {
    redirect(DEFAULT_RM_REDIRECT);
  }
  redirect("/auth/login");
}
