import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  DEFAULT_ADMIN_REDIRECT_TRADING_CODE,
  DEFAULT_ADMIN_REDIRECT_BUSINESS_MANAGEMENT,
  DEFAULT_ADMIN_REDIRECT_TRADE_INSIGHT,
  DEFAULT_ADMIN_REDIRECT_CUSTOMER_MANAGEMENT,
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
  const boardPermissions = session.user.boardPermissions || {};

  if (["ADMIN", "MANAGEMENT"].includes(role)) {
    if (boardPermissions.activeTradingCodes) {
      return <HomeClient redirectUrl={DEFAULT_ADMIN_REDIRECT_TRADING_CODE} role={role} accessToken={token} />;
    } 
    else if (boardPermissions.businessAndTradeManagement) {
      return <HomeClient redirectUrl={DEFAULT_ADMIN_REDIRECT_BUSINESS_MANAGEMENT} role={role} accessToken={token} />;
    }
    else if (boardPermissions.tradeInsights) {
      return <HomeClient redirectUrl={DEFAULT_ADMIN_REDIRECT_TRADE_INSIGHT} role={role} accessToken={token} />;
    }
    else if (boardPermissions.customerManagement) {
      return <HomeClient redirectUrl={DEFAULT_ADMIN_REDIRECT_CUSTOMER_MANAGEMENT} role={role} accessToken={token} />;
    }
  }
  if (["BRANCH_MANAGER", "CLUSTER_MANAGER"].includes(role)) {
    return <HomeClient redirectUrl={DEFAULT_MANAGEMENT_REDIRECT} role={role} accessToken={token} />;
  }
  if (["REGIONAL_MANAGER"].includes(role)) {
    return <HomeClient redirectUrl={DEFAULT_RM_REDIRECT} role={role} accessToken={token} />;
  }

  return <HomeClient redirectUrl="/auth/login" role="unknown" accessToken="unknown" />;
}
