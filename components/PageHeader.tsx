import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BranchFilter from "@/components/branchFilter";
import RMFilter from "@//components/rmFilter";

interface PageHeaderProps {
  name: string;
}

const PageHeader: FC<PageHeaderProps> = ({ name }) => {
  return (
    <Card className="mt-2 flex justify-center items-center bg-gradient-to-br from-gray-50 to-slate-100 shadow-md">
      <CardContent className="w-full p-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2">
            <BranchFilter />
            <RMFilter />
          </div>
          <div className="ml-10 text-start text-3xl font-bold text-neutral-600 flex-2 w-full">
            {name}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeader;
