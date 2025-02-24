import React from "react";
import { activeTradingCodeAPI } from "../api";
import { useQuery } from "@tanstack/react-query";
import { BarColors } from "@/components/ui/utils/constants";
import BarChartHorizontal from "@/components/BarChartHorizontal";
import CardBoard from "@/components/CardBoard";
import { SkeletonStatistics } from "@/components/skeletonCard";




interface Props {
  data: any;
}

export const SectorTurnoverBreakdown: React.FC<Props> = ({ data }) => {

    
     const Option = {
        legendName: "Quantity",
        dataKey: "name",
        valueKey: "value",
        fill: BarColors.blue,
        stroke: "purple",
        height: 900,
        barLabel: true,
      };

    const { data: sectorTurnoverBreakdown, isLoading: sectorTurnoverBreakdownLoading, isError: sectorTurnoverBreakdownError } = useQuery({
        queryKey: ["sectorTurnoverBreakdown"],
        queryFn: () => activeTradingCodeAPI.getSectorwiseTurnoverBreakdown(data?.name?.toUpperCase() || "")
      });
      console.log(sectorTurnoverBreakdown)
  if (!data) {
    return <div>No data selected.</div>;
  }

  return (
    <div className="">
         {sectorTurnoverBreakdown?.data ? (
              <BarChartHorizontal
                data={sectorTurnoverBreakdown?.data}
                options={Option}
                colorArray={ ["#388E3C", "#2196F3", "#E65100", "#7B1FA2", "#D32F2F"]}
              />
        ) : (
          <SkeletonStatistics className="col-span-6 xl:col-span-3" />
        )}
    </div>
  );
};
