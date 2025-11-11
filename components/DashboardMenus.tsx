"use client";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  GrBraille,
  GrBarChart
} from "react-icons/gr";
import { BiBarChartAlt2 } from "react-icons/bi";
import { CgUserList, CgPerformance } from "react-icons/cg";
import { FaGear, FaStore } from "react-icons/fa6";
import { useRouter, usePathname, redirect } from "next/navigation";
import { ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineShop,
} from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiProfileLine } from "react-icons/ri";
import { GiTakeMyMoney, GiTrade } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { ImProfile } from "react-icons/im";
import { TbChartHistogram } from "react-icons/tb";
import { IoChevronForward } from "react-icons/io5";
import React from "react";

// Header component with toggle arrow
const CustomHeaderGroup = ({
  icon,
  name,
  onClick,
  isOpen,
}: {
  icon: ReactNode;
  name: string;
  onClick: () => void;
  isOpen: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full px-1 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm mb-1 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition"
      )}
    >
      {/* Left: icon + name */}
      <div className="flex items-center gap-1">
        <div className="text-lg text-blue-600">{icon}</div>
        <p className="text-lg font-semibold text-gray-800 tracking-wide">
          {name}
        </p>
      </div>

      {/* Right: chevron arrow */}
      <IoChevronForward
        className={cn(
          "text-blue-600 text-lg transition-transform duration-300",
          { "rotate-90": isOpen }
        )}
      />
    </div>
  );
};

const menuList = [
  {
    id: 1,
    codeName: "admin_dashboards",
    viewName: "Admin Analytics",
    icon: <MdAdminPanelSettings className="h-6 w-6" />,
    roles: ["ADMIN", "MANAGEMENT"],
    subMenus: [
      {
        id: 1,
        codeName: "active_trading_codes",
        viewName: "Active Trading Codes",
        urlPath: "/dashboard/active-trading-codes",
        icon: <AiOutlineDashboard className="h-5 w-5 text-orange-500" />,
        roles: ["ADMIN", "MANAGEMENT"],
      },
      {
        id: 2,
        codeName: "business_and_trade_management",
        viewName: "Business and Trade Management",
        urlPath: "/dashboard/business-and-trade-management",
        icon: <AiOutlineShop className="h-6 w-6 text-green-500" />,
        roles: ["ADMIN", "MANAGEMENT"],
      },
      {
        id: 2,
        codeName: "trade_insights",
        viewName: "Trade Insights",
        urlPath: "/dashboard/trade-insights",
        icon: <GiTrade className="h-6 w-6 text-yellow-400" />,
        roles: ["ADMIN", "MANAGEMENT"],
      },
      {
        id: 3,
        codeName: "customer_management",
        viewName: "Customer Management",
        urlPath: "/dashboard/customer-management",
        icon: <AiOutlineUser className="h-5 w-5 text-purple-500" />,
        roles: ["ADMIN", "MANAGEMENT"],
      },
    ],
  },
  {
    id: 2,
    codeName: "financial_info",
    viewName: "Financial Info",
    icon: <MdAdminPanelSettings className="h-6 w-6" />,
    roles: ["ADMIN", "MANAGEMENT"],
    subMenus: [
      {
        id: 1,
        codeName: "customer_fund_flow",
        viewName: "Customer Fund Flow",
        urlPath: "/dashboard/customer_fund_flow",
        icon: <AiOutlineDashboard className="h-5 w-5 text-orange-500" />,
        roles: ["ADMIN", "MANAGEMENT"],
      }
    ],
  },
  {
    id: 3,
    codeName: "branch_dashboards",
    viewName: "Branch Analytics",
    icon: <FaStore className="h-5 w-5" />,
    roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
    subMenus: [
      {
        id: 1,
        codeName: "live_trade_status",
        viewName: "Live Trade Status",
        urlPath: "/dashboard/live-trade-status",
        icon: <GrBarChart className="h-4 w-4 text-fuchsia-500" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
      {
        id: 2,
        codeName: "daily_trade_performance",
        viewName: "Daily Trade Performance",
        urlPath: "/dashboard/daily-trade-performance",
        icon: <BsGraphUpArrow className="h-5 w-5 text-lime-500" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
      {
        id: 3,
        codeName: "portfolio_management",
        viewName: "Portfolio Management",
        urlPath: "/dashboard/portfolio-management",
        icon: <RiProfileLine className="h-5 w-5 text-rose-500" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
      {
        id: 4,
        codeName: "margin_loan_usage",
        viewName: "Margin Loan Usage",
        urlPath: "/dashboard/margin-loan-usage",
        icon: <GiTakeMyMoney className="h-5 w-5 text-teal-500" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
      {
        id: 5,
        codeName: "branch_performance",
        viewName: "Branch Performance",
        urlPath: "/dashboard/branch-performance",
        icon: <FcSalesPerformance className="h-5 w-5" />,
        roles: ["ADMIN", "MANAGEMENT", "BRANCH_MANAGER", "CLUSTER_MANAGER"],
      },
    ],
  },
  {
    id: 4,
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
        codeName: "live_trade_status",
        viewName: "Live Trade Status",
        urlPath: "/dashboard/rm/live-trade-status",
        icon: <GrBraille className="h-5 w-5 text-red-500" />,
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
        codeName: "daily_trade_performance",
        viewName: "Daily Trade Performance",
        urlPath: "/dashboard/rm/daily-trade-performance",
        icon: <CgPerformance className="h-5 w-5 text-violet-500" />,
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
        codeName: "rm_performance",
        viewName: "RM Performance",
        urlPath: "/dashboard/rm/performance-report",
        icon: <TbChartHistogram className="h-5 w-5 text-pink-500" />,
        roles: [
          "ADMIN",
          "MANAGEMENT",
          "BRANCH_MANAGER",
          "CLUSTER_MANAGER",
          "REGIONAL_MANAGER",
        ],
      },
      {
        id: 4,
        codeName: "rm_portfolio",
        viewName: "RM Portfolio",
        urlPath: "/dashboard/rm/portfolio-report",
        icon: <ImProfile className="h-5 w-5 text-indigo-500" />,
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
    id: 5,
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
        icon: <CgUserList className="h-5 w-5 text-purple-500" />,
        roles: ["ADMIN"],
      },
    ],
  },
  {
    id: 4,
    codeName: "settings",
    viewName: "Settings",
    icon: <FaGear className="h-4 w-4" />,
    roles: ["MANAGEMENT"],
    subMenus: [
      {
        id: 1,
        codeName: "user-list",
        viewName: "User List",
        urlPath: "/user-list",
        icon: <CgUserList className="h-5 w-5 text-purple-500" />,
        roles: ["MANAGEMENT"],
      },
    ],
  },
];

export default function DashboardMenus() {
  const { push } = useRouter();
  const pathName = usePathname();
  const { data: session } = useSession();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  if (!session) {
    redirect(DEFAULT_LOGIN_REDIRECT);
  }

  const userRole = session.user.role;
  const boardPermissions = session.user.boardPermissions || {};
  // ✅ Filter menus based on role
  let menus = menuList.filter(
    (item) =>
      item.roles.includes(userRole) ||
      item.subMenus?.some((s) => s.roles.includes(userRole))
  );

menus = menus.map((menu) => {
  if (menu.codeName === "admin_dashboards" && Array.isArray(menu.subMenus)) {
    const filteredSubMenus = menu.subMenus.filter((sub) => {
      switch (sub.codeName) {
        case "active_trading_codes":
          return boardPermissions.activeTradingCodes; // show only if true
        case "business_and_trade_management":
          return boardPermissions.businessAndTradeManagement; // show only if true
        case "trade_insights":
          return boardPermissions.tradeInsights; // show only if true
        case "customer_management":
          return boardPermissions.customerManagement; // show only if true
        default:
          return true;
      }
    });

    return {
      ...menu,
      subMenus: filteredSubMenus,
    };
  }

  return menu;
});
  
   


  // ✅ Automatically open menu if current path matches any submenu URL
  React.useEffect(() => {
    const matchedMenu = menus.find((menu) =>
      menu.subMenus?.some((sub) => sub.urlPath === pathName)
    );
    if (matchedMenu && !openMenus.includes(matchedMenu.codeName)) {
      setOpenMenus((prev) => [...prev, matchedMenu.codeName]);
    }
  }, [pathName, menus, openMenus]);

  const toggleMenu = (codeName: string) => {
    setOpenMenus((prev) =>
      prev.includes(codeName)
        ? prev.filter((c) => c !== codeName)
        : [...prev, codeName]
    );
  };

  const visitUrl = (url: string) => {
    push(url);
  };

  return (
    <aside
      className={cn(
        "min-h-[100vh] w-68 shadow-lg rounded-r-xl border-r border-gray-200 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100"
      )}
    >
      <Command>
        <CommandList className="min-h-[100vh] px-1 py-1">
          {menus.map((menu) => {
            const isOpen = openMenus.includes(menu.codeName);
            return (
              <div key={menu.codeName} className="mb-2">
                <CommandGroup
                  value={menu.codeName}
                  heading={
                    <CustomHeaderGroup
                      icon={menu.icon}
                      name={menu.viewName}
                      onClick={() => toggleMenu(menu.codeName)}
                      isOpen={isOpen}
                    />
                  }
                >
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    {menu.subMenus.map((subMenu) => (
                      <CommandItem
                        onSelect={() => visitUrl(subMenu.urlPath)}
                        key={subMenu.id}
                        value={subMenu.urlPath}
                        className={cn(
                          "ml-2 flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-200 hover:scale-[1.02] group",
                          {
                            "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md":
                              subMenu.urlPath === pathName,
                          }
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={cn("transition-colors duration-200", {
                              "text-white": subMenu.urlPath === pathName,
                            })}
                          >
                            {subMenu.icon}
                          </span>
                          <span
                            className={cn(
                              "text-sm font-medium transition-colors duration-200",
                              {
                                "text-white": subMenu.urlPath === pathName,
                              }
                            )}
                          >
                            {subMenu.viewName}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </div>
                </CommandGroup>
                <CommandSeparator className="my-2" />
              </div>
            );
          })}
        </CommandList>
      </Command>
    </aside>
  );
}
