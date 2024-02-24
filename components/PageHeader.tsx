import { FC } from "react";
import { Card, CardContent } from "./ui/card";

interface PageHeaderProps {
  name: string;
}

const PageHeader: FC<PageHeaderProps> = ({ name }) => {
  return (
    <Card className="mt-2 flex justify-center items-center bg-gradient-to-r from-gray-800 via-gray-700 to-slate-700 shadow-lg">
      <CardContent className="text-3xl font-bold text-center p-4 text-neutral-300">
        {name}
      </CardContent>
    </Card>
  );
};

export default PageHeader;
