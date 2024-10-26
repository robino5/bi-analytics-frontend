import { FC, ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "./theme-toggle";

interface PageHeaderProps {
  name: string;
  children?: ReactNode;
}

const PageHeader: FC<PageHeaderProps> = ({ name, children }) => {
  return (
    <Card className="mt-2 flex justify-center items-center shadow-md">
      <CardContent className="w-full p-4 flex justify-between items-center gap-4">
        <div className="flex gap-2">{children}</div>
        <div className="ml-10 text-3xl text-center font-bold flex-2 w-full">
          {name}
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeader;
