"use client"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { BarChart, BarChart4Icon } from "lucide-react";

import { useRouter, usePathname } from "next/navigation";

export default function DashboardMenus() {
  const { push } = useRouter();
  const pathName = usePathname();

  const menuList = [
    {
      id: 1,
      codeName: "branch_dashboards",
      viewName: "Branch Dashboards",
      icon: <BarChart />,
      subMenus: [
        {
          id: 1,
          codeName: "daily_trade_performance",
          viewName: "Daily Trade Performance",
          urlPath: "/dashboard/daily-trade-performance",
          icon: <BarChart4Icon />,
        },
        {
          id: 2,
          codeName: "portfolio_management",
          viewName: "Portfolio Management",
          urlPath: "/dashboard/portfolio-management",
          icon: <BarChart4Icon />,
        },
        {
          id: 3,
          codeName: "margin_loan_usage",
          viewName: "Margin Loan Usage",
          urlPath: "/dashboard/margin-loan-usage",
          icon: <BarChart4Icon />,
        },
        {
          id: 4,
          codeName: "branch_performance",
          viewName: "Branch Performance",
          urlPath: "/dashboard/branch-performance",
          icon: <BarChart4Icon />,
        },
      ],
    },
    {
      id: 2,
      codeName: "rm_dashboards",
      viewName: "RM Dashboards",
      icon: null,
      subMenus: [
        {
          id: 1,
          codeName: "daily_trade_performance",
          viewName: "Daily Trade Performance",
          urlPath: "/dashboard/rm/daily-trade-performance",
          icon: <BarChart4Icon />,
        },
        {
          id: 2,
          codeName: "rm_performance",
          viewName: "RM Performance",
          urlPath: "/dashboard/rm-performance",
          icon: <BarChart4Icon />,
        },
        {
          id: 3,
          codeName: "rm_portfolio",
          viewName: "RM Portfolio",
          urlPath: "/dashboard/rm-portfolio",
          icon: <BarChart4Icon />,
        },
      ],
    },
  ];

  const visitUrl = (url: string) => {
    push(url);
  };
  return (
    <Command>
      <CommandList className="max-h-full">
        {menuList.map((menu) => {
          return (
            <div key={menu.id}>
              <CommandGroup value={menu.codeName} heading={`${menu.viewName}`}>
                {menu.subMenus.map((subMenu) => (
                  <CommandItem
                    onSelect={visitUrl}
                    key={subMenu.id}
                    value={subMenu.urlPath}
                    className={cn("flex justify-between items-center gap-3 ", {
                      "bg-gray-300 text-gray-800 font-bold":
                        subMenu.urlPath === pathName,
                    })}
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
