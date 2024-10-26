"use client";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { GrBraille, GrBarChart } from "react-icons/gr";
import { DiGoogleAnalytics } from "react-icons/di";
import { BiBarChartAlt2 } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";
import { FaGear } from "react-icons/fa6";
import { useRouter, usePathname, redirect } from "next/navigation";
import { ReactNode } from "react";
import { LiaUserShieldSolid } from "react-icons/lia";
import { FcBearish } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const CustomHeaderGroup = (props: { icon: ReactNode; name: string }) => {
  const { icon, name } = props;
  return (
    <div className="flex gap-2 justify-start items-center">
      {icon}
      <p className="text-md">{name}</p>
    </div>
  );
};

const menuList = [
  {
    id: 1,
    codeName: "admin_dashboards",
    viewName: "Admin Analytics",
    icon: <LiaUserShieldSolid className="h-5 w-5" />,
    roles: ["ADMIN", "MANAGEMENT"],
    subMenus: [
      {
        id: 1,
        codeName: "active_trading_codes",
        viewName: "Active Trading Codes",
        urlPath: "/dashboard/active-trading-codes",
        icon: <FcBearish className="h-4 w-4" />,
        roles: ["ADMIN", "MANAGEMENT"],
      },
      {
        id: 2,
        codeName: "business_and_trade_management",
        viewName: "Business and Trade Management",
        urlPath: "/dashboard/business-and-trade-management",
        icon: <FcBearish className="h-4 w-4" />,
        roles: ["ADMIN", "MANAGEMENT"],
      },
      {
        id: 3,
        codeName: "customer_management",
        viewName: "Customer Management",
        urlPath: "/dashboard/customer-management",
        icon: <FcBearish className="h-4 w-4" />,
        roles: ["ADMIN", "MANAGEMENT"],
      },
    ],
  },
  {
    id: 2,
    codeName: "branch_dashboards",
    viewName: "Branch Analytics",
    icon: <DiGoogleAnalytics className="h-5 w-5" />,
    roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
    subMenus: [
      {
        id: 1,
        codeName: "daily_trade_performance",
        viewName: "Daily Trade Performance",
        urlPath: "/dashboard/daily-trade-performance",
        icon: <GrBarChart className="h-4 w-4" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
      {
        id: 2,
        codeName: "portfolio_management",
        viewName: "Portfolio Management",
        urlPath: "/dashboard/portfolio-management",
        icon: <GrBarChart className="h-4 w-4" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
      {
        id: 3,
        codeName: "margin_loan_usage",
        viewName: "Margin Loan Usage",
        urlPath: "/dashboard/margin-loan-usage",
        icon: <GrBarChart className="h-4 w-4" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
      {
        id: 4,
        codeName: "branch_performance",
        viewName: "Branch Performance",
        urlPath: "/dashboard/branch-performance",
        icon: <GrBarChart className="h-4 w-4" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
    ],
  },
  {
    id: 3,
    codeName: "rm_dashboards",
    viewName: "RM Analytics",
    icon: <BiBarChartAlt2 className="h-5 w-5" />,
    roles: [
      "ADMIN",
      "MANAGEMENT",
      "BRANCH_MANAGER",
      "CLUSTER_MANAGER",
      "REGIONAL_MANAGER",
    ],
    subMenus: [
      {
        id: 1,
        codeName: "daily_trade_performance",
        viewName: "Daily Trade Performance",
        urlPath: "/dashboard/rm/daily-trade-performance",
        icon: <GrBraille className="h-4 w-4" />,
        roles: [
          "ADMIN",
          "MANAGEMENT",
          "BRANCH_MANAGER",
          "CLUSTER_MANAGER",
          "REGIONAL_MANAGER",
        ],
      },
      {
        id: 2,
        codeName: "rm_performance",
        viewName: "RM Performance",
        urlPath: "/dashboard/rm/performance-report",
        icon: <GrBraille className="h-4 w-4" />,
        roles: [
          "ADMIN",
          "MANAGEMENT",
          "BRANCH_MANAGER",
          "CLUSTER_MANAGER",
          "REGIONAL_MANAGER",
        ],
      },
      {
        id: 3,
        codeName: "rm_portfolio",
        viewName: "RM Portfolio",
        urlPath: "/dashboard/rm/portfolio-report",
        icon: <GrBraille className="h-4 w-4" />,
        roles: [
          "ADMIN",
          "MANAGEMENT",
          "BRANCH_MANAGER",
          "CLUSTER_MANAGER",
          "REGIONAL_MANAGER",
        ],
      },
    ],
  },
  {
    id: 3,
    codeName: "settings",
    viewName: "Settings",
    icon: <FaGear className="h-4 w-4" />,
    roles: ["ADMIN"],
    subMenus: [
      {
        id: 1,
        codeName: "users",
        viewName: "Users",
        urlPath: "/users",
        icon: <CgUserList className="h-4 w-4" />,
        roles: ["ADMIN"],
      },
    ],
  },
];

export default function DashboardMenus() {
  const { push } = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();

  if (!session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }
  const userRole = session.user.role;

  const menus = menuList.filter((item) => {
    return (
      item.roles.includes(userRole) ||
      (item.subMenus &&
        item.subMenus.some((subMenu) => subMenu.roles.includes(userRole)))
    );
  });

  const visitUrl = (url: string) => {
    push(url);
  };

  return (
    <Command>
      <CommandList className="max-h-full mb-4">
        {menus.map((menu) => {
          return (
            <div key={menu.codeName}>
              <CommandGroup
                value={menu.codeName}
                heading={
                  <CustomHeaderGroup icon={menu.icon} name={menu.viewName} />
                }
              >
                {menu.subMenus.map((subMenu) => (
                  <CommandItem
                    onSelect={visitUrl}
                    key={subMenu.id}
                    value={subMenu.urlPath}
                    className={cn(
                      "ml-4 flex justify-between items-center gap-3 ",
                      {
                        "bg-gray-300 text-gray-800 font-bold":
                          subMenu.urlPath === pathName,
                      }
                    )}
                  >
                    <div className="flex justify-between items-center gap-3">
                      {subMenu.icon}
                      {subMenu.viewName}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </div>
          );
        })}
      </CommandList>
    </Command>
  );
}
