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

import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

const CustomHeaderGroup = (props: { icon: ReactNode; name: string }) => {
  const { icon, name } = props;
  return (
    <div className="flex gap-2 justify-start items-center">
      {icon}
      <p className="text-md">{name}</p>
    </div>
  );
};

export default function DashboardMenus() {
  const { push } = useRouter();
  const pathName = usePathname();

  const menuList = [
    {
      id: 1,
      codeName: "branch_dashboards",
      viewName: "Branch Dashboards",
      icon: <DiGoogleAnalytics className="h-5 w-5" />,
      subMenus: [
        {
          id: 1,
          codeName: "daily_trade_performance",
          viewName: "Daily Trade Performance",
          urlPath: "/dashboard/daily-trade-performance",
          icon: <GrBarChart className="h-4 w-4" />,
        },
        {
          id: 2,
          codeName: "portfolio_management",
          viewName: "Portfolio Management",
          urlPath: "/dashboard/portfolio-management",
          icon: <GrBarChart className="h-4 w-4" />,
        },
        {
          id: 3,
          codeName: "margin_loan_usage",
          viewName: "Margin Loan Usage",
          urlPath: "/dashboard/margin-loan-usage",
          icon: <GrBarChart className="h-4 w-4" />,
        },
        {
          id: 4,
          codeName: "branch_performance",
          viewName: "Branch Performance",
          urlPath: "/dashboard/branch-performance",
          icon: <GrBarChart className="h-4 w-4" />,
        },
      ],
    },
    {
      id: 2,
      codeName: "rm_dashboards",
      viewName: "RM Dashboards",
      icon: <BiBarChartAlt2 className="h-5 w-5" />,
      subMenus: [
        {
          id: 1,
          codeName: "daily_trade_performance",
          viewName: "Daily Trade Performance",
          urlPath: "/dashboard/rm/daily-trade-performance",
          icon: <GrBraille className="h-4 w-4" />,
        },
        {
          id: 2,
          codeName: "rm_performance",
          viewName: "RM Performance",
          urlPath: "/dashboard/rm/performance-report",
          icon: <GrBraille className="h-4 w-4" />,
        },
        {
          id: 3,
          codeName: "rm_portfolio",
          viewName: "RM Portfolio",
          urlPath: "/dashboard/rm/portfolio-report",
          icon: <GrBraille className="h-4 w-4" />,
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
