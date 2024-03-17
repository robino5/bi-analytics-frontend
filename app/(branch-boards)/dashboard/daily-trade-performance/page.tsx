"use client";

import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVerticalGrouped from "@/components/BarChartVerticalGrouped";
import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import StatisticsCardClientTurnoverSummary from "@/components/StatisticsCardClientTurnoverSummary";
import StatisticsCashCodeSummary from "@/components/StatisticsCashCodeSummary";
import StatisticsMarginCodeSummary from "@/components/StatisticsMarginCodeSummary";

import { BarColors } from "@/components/ui/utils/constants";
import BranchFilter from "@/components/branchFilter";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { ISummaryDetails } from "@/types/dailyTurnoverPerformance";
import { successResponse } from "@/lib/utils";
import SummarySkeletonCard from "@/components/skeletonCard";

export default function DailyTradePerformance() {
  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };
  // ===========================================
  const turnoverChartData = [
    {
      label: "08-Feb-24",
      generated: 2733124262.3,
      target: 913500000,
    },
    {
      label: "11-Feb-24",
      generated: 2715647013.4,
      target: 913500000,
    },
    {
      label: "12-Feb-24",
      generated: 2244503832.4,
      target: 913500000,
    },
    {
      label: "13-Feb-24",
      generated: 2296593846.3,
      target: 913500000,
    },
    {
      label: "14-Feb-24",
      generated: 1733089432.4,
      target: 913500000,
    },
    {
      label: "15-Feb-24",
      generated: 1555119428.8,
      target: 893500000,
    },
    {
      label: "18-Feb-24",
      generated: 1224945129.1,
      target: 913500000,
    },
  ];

  const marginChartData = [
    {
      name: "BANK",
      value: 605841433,
    },
    {
      name: "TEXTILE",
      value: 175277852,
    },
    {
      name: "MUTUAL FUNDS",
      value: 153784619,
    },
    {
      name: "ENGINEERING",
      value: 149737394,
    },
    {
      name: "OPEN ENDED MUTUAL FUNDS",
      value: 138891146,
    },
    {
      name: "NBFI",
      value: 105384912,
    },
    {
      name: "PHARMACEUTICALS CHEMICAL",
      value: 87827209,
    },
    {
      name: "MISCELLANEOUS",
      value: 69445434,
    },
    {
      name: "FUEL POWER",
      value: 57753913,
    },
    {
      name: "INSURANCE",
      value: 56962752,
    },
    {
      name: "CEMENT",
      value: 23757412,
    },
    {
      name: "FOOD ALLIED",
      value: 23659696,
    },
    {
      name: "TELECOMMUNICATION",
      value: 22722181,
    },
    {
      name: "TRAVEL LEISURE",
      value: 20534358,
    },
    {
      name: "IT",
      value: 15876224,
    },
    {
      name: "SERVICES REAL ESTATE",
      value: 13410278,
    },
    {
      name: "CERAMICS",
      value: 9741429,
    },
    {
      name: "TREASURY BOND",
      value: 6533000,
    },
    {
      name: "PAPER PRINTING",
      value: 4266293,
    },
    {
      name: "TANNERY",
      value: 1862018,
    },
    {
      name: "JUTE",
      value: 143743,
    },
    {
      name: "CORPORATE BOND",
      value: 24082,
    },
  ];

  const turnoverChartOptions = [
    {
      name: "Target",
      dataKey: "target",
      fill: BarColors.red,
      stroke: "blue",
      barLabel: false,
    },
    {
      name: "Generated",
      dataKey: "generated",
      fill: BarColors.green,
      stroke: "purple",
      barLabel: true,
    },
  ];

  const marginChartOption = {
    legendName: "Quantity",
    dataKey: "name",
    valueKey: "value",
    fill: BarColors.blue,
    stroke: "purple",
    height: 700,
    barLabel: false,
  };

  const sectorCashCodeExposureOption = {
    legendName: "Quantity",
    dataKey: "name",
    valueKey: "value",
    fill: BarColors.purple,
    stroke: "purple",
    height: 700,
    barLabel: false,
  };

  const [branch, setBranch] = useState<string>("");
  const [summary, setSummary] = useState<ISummaryDetails | null>(null);

  const traceBranchChange = async (branchId: string) => {
    setBranch(branchId);
  };

  // useEffect(() => {
  //   if (branch) {
  //     const fetchData = async () => {
  //       const data = await getSummary(branch);
  //       console.log(data);
  //     };
  //     fetchData();
  //   }
  // }, [branch]);

  useEffect(() => {
    const fetchSummary = async () => {
      const session = await getSession();
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/basic-summaries/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<ISummaryDetails>;
        if (successResponse(result.status)) {
          setSummary(result.data);
        }
      } catch (error) {
        console.error(`Error Happened while fetching Summary`, error);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="mx-4">
      <PageHeader name="Daily Trade Performance">
        <BranchFilter onChange={traceBranchChange} />
      </PageHeader>
      <div className="grid grid-cols-6 gap-3 xl:grid-cols-6 mt-2">
        {summary?.shortSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Summary"
            subtitle="shows overall short summary"
            children={
              <StatisticsCardClientTurnoverSummary
                data={summary.shortSummary}
              />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summary?.cashCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Cash Code Status"
            subtitle="shows cash code summary"
            children={
              <StatisticsCashCodeSummary data={summary.cashCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {summary?.marginCodeSummary ? (
          <CardBoard
            className="col-span-6 xl:col-span-2"
            title="Margin Code Status"
            subtitle="shows margin code summary"
            children={
              <StatisticsMarginCodeSummary data={summary.marginCodeSummary} />
            }
          />
        ) : (
          <SummarySkeletonCard className="col-span-6 xl:col-span-2" />
        )}
        {/* Turnover Performance Chart */}
        <CardBoard
          className="col-span-6 xl:col-span-3"
          title={"Turnover Performance"}
          subtitle="Shows a analytics of turnover performance of last 7 days."
          children={
            <BarChartVerticalGrouped
              data={turnoverChartData}
              options={turnoverChartOptions}
            />
          }
        />
        <CardBoard
          className="col-span-6 xl:col-span-3"
          title={"Daily Margin Loan Usage"}
          subtitle="Shows a analytics of turnover performance of last 7 days."
          children={
            <BarChartVerticalGrouped
              data={turnoverChartData}
              options={turnoverChartOptions}
            />
          }
        />
        <CardBoard
          className="col-span-6 row-span-2 xl:col-span-3"
          title="Sector Exposure Margin Code"
          subtitle="Shows analytics of marginal performance for comodities"
          children={
            <BarChartHorizontal
              data={marginChartData}
              options={marginChartOption}
            />
          }
        />

        <CardBoard
          className="col-span-6 row-span-2 xl:col-span-3"
          title="Sector Exposure Cash Code"
          subtitle="Shows analytics of marginal performance for comodities"
          children={
            <BarChartHorizontal
              data={marginChartData}
              options={sectorCashCodeExposureOption}
            />
          }
        />
      </div>
    </div>
  );
}
