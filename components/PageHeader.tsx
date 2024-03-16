import { FC, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PageHeaderProps {
  name: string;
  children?: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ name, children }) => {
  return (
    <Card className="mt-2 flex justify-center items-center bg-gradient-to-br from-gray-50 to-slate-200 shadow-md">
      <CardContent className="w-full p-4 flex justify-between items-center gap-4">
        <div className="flex gap-2">{children}</div>
        <div className="ml-10 text-3xl text-center font-bold text-neutral-600 flex-2 w-full">
          {name}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeader;
