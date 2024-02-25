import { FC } from "react";
import { Card, CardContent } from "./ui/card";

interface PageHeaderProps {
  name: string;
}

const PageHeader: FC<PageHeaderProps> = ({ name }) => {
  return (
    <Card className="mt-2 flex justify-center items-center bg-gradient-to-br from-gray-50 to-slate-100 shadow-md">
      <CardContent className="text-3xl font-bold text-center p-4 text-neutral-600">
        {name}
      </CardContent>
    </Card>
  );
};

export default PageHeader;
