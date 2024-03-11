import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BranchFilter from "@/components/branchFilter";
import RMFilter from "@//components/rmFilter";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  name: string;
  branchFilter?: boolean;
  rmFilter?: boolean;
}

const PageHeader: FC<PageHeaderProps> = ({
  name,
  branchFilter = true,
  rmFilter = true,
}) => {
  return (
    <Card className="mt-2 flex justify-center items-center bg-gradient-to-br from-gray-50 to-slate-200 shadow-md">
      <CardContent className="w-full p-4">
        <div
          className={cn("flex", {
            "justify-between items-center gap-4": branchFilter || rmFilter,
          })}
        >
          <div className="flex gap-2">
            {branchFilter && <BranchFilter />} {rmFilter && <RMFilter />}
          </div>
          <div
            className={cn(
              "ml-10 text-3xl text-center font-bold text-neutral-600 flex-2 w-full",
              {
                "text-start": branchFilter || rmFilter,
              }
            )}
          >
            {name}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeader;
