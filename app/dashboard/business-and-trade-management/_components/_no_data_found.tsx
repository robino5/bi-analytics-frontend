import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function NoDataFound({title}: {title: string}) {
    return (
        <Card className="col-span-3 overflow-auto bg-[#033e4a]">
          <CardHeader className="bg-gradient-to-r from-teal-900 via-teal-600 to-teal-800 p-2 rounded-tl-lg rounded-tr-lg">
            <CardTitle className="text-white text-md text-lg">
                {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-2 text-white text-center py-6">
            No Data Found
          </CardContent>
        </Card>
      );
    }
