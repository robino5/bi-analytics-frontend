import BarChartHorizontal from "@/components/BarChartHorizontal";
import BarChartVerticalGrouped from "@/components/BarChartVerticalGrouped";
import CardBoard from "@/components/CardBoard";
import PageHeader from "@/components/PageHeader";
import StatisticsCardClientTurnoverSummary from "@/components/StatisticsCardClientTurnoverSummary";
import StatisticsCashCodeSummary from "@/components/StatisticsCashCodeSummary";
import StatisticsMarginCodeSummary from "@/components/StatisticsMarginCodeSummary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Trade Performance - LBSL",
  description: "daily trading performance analytics dashboards",
};

export default function DailyTradePerformance() {
  const turnoverChartData = [
    {
      xLabel: "08-Feb-24",
      generated: 2733124262.3,
      target: 913500000,
    },
    {
      xLabel: "11-Feb-24",
      generated: 2715647013.4,
      target: 913500000,
    },
    {
      xLabel: "12-Feb-24",
      generated: 2244503832.4,
      target: 913500000,
    },
    {
      xLabel: "13-Feb-24",
      generated: 2296593846.3,
      target: 913500000,
    },
    {
      xLabel: "14-Feb-24",
      generated: 1733089432.4,
      target: 913500000,
    },
    {
      xLabel: "15-Feb-24",
      generated: 1555119428.8,
      target: 893500000,
    },
    {
      xLabel: "18-Feb-24",
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
      fill: "#8884d8",
      stroke: "blue",
      barLabel: false,
    },
    {
      name: "Generated",
      dataKey: "generated",
      fill: "#82ca9d",
      stroke: "purple",
      barLabel: true,
    },
  ];

  const marginChartOption = {
    legendName: "Quantity",
    dataKey: "name",
    valueKey: "value",
    fill: "#82ca9d",
    stroke: "purple",
    height: 700,
    barLabel: false,
  };

  const clientTurnoverSummaryData = {
    totalClient: {
      name: "Total Client",
      value: 2240,
    },
    activeClient: {
      name: "Active Client",
      value: 1149,
    },
    turnover: {
      name: "Turnover",
      value: 334049049.3094,
    },
    netBuySell: {
      name: "Net Buy/Sell",
      value: 390939.33,
    },
  };

  const cashCodeSummaryData = {
    cashBalance: {
      name: "Cash Balance",
      value: 498893434,
    },
    stockBalance: {
      name: "Stock Value",
      value: 2323210,
    },
    dailyTurnover: {
      name: "Daily Turnover",
      value: 309393,
    },
    activeClient: {
      name: "Active Client",
      value: 2909090,
    },
  };

  const marginCodeSummaryData = {
    loanBalance: {
      name: "Loan Balance",
      value: 498893434,
    },
    stockBalance: {
      name: "Stock Value",
      value: 2323210,
    },
    dailyTurnover: {
      name: "Daily Turnover",
      value: 309393,
    },
    activeClient: {
      name: "Active Client",
      value: 2909090,
    },
  };

  return (
    <div className="mx-4">
      <PageHeader name="Daily Trade Performance" />
      <div className="grid grid-cols-6 gap-2 xl:grid-cols-6 mt-2">
        <CardBoard
          className="col-span-6 xl:col-span-2"
          title="Summary"
          subtitle="shows margin code summary"
          children={
            <StatisticsCardClientTurnoverSummary
              data={clientTurnoverSummaryData}
            />
          }
        />
        <CardBoard
          className="col-span-6 xl:col-span-2"
          title="Cash Code Status"
          subtitle="shows cash code summary"
          children={<StatisticsCashCodeSummary data={cashCodeSummaryData} />}
        />
        <CardBoard
          className="col-span-6 xl:col-span-2"
          title="Margin Code Status"
          subtitle="shows margin code summary"
          children={
            <StatisticsMarginCodeSummary data={marginCodeSummaryData} />
          }
        />
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
              options={marginChartOption}
            />
          }
        />
      </div>
    </div>
  );
}
