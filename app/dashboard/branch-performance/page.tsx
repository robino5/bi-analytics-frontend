"use client";

import PageHeader from "@/components/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BranchWiseMarginDataTable from "./_branchwise_margin_datatable";
import BranchWiseExposureDataTable from "./_branchwise_exposure_datatable";

import { DataTableCard } from "./data-table";
import { branchWiseFundColumns, branchWiseTurnoverColumns } from "./columns";
import BranchFilter from "@/components/branchFilter";
import { useEffect, useState } from "react";
import {
  IBranchWiseExposure,
  IBranchWiseFund,
  IBranchWiseMargin,
  ITurnoverStatus,
} from "@/types/branchPerformance";
import { useSession } from "next-auth/react";
import { formatDate, getHeaderDate, successResponse } from "@/lib/utils";
import { IResponse } from "@/types/utils";
import { ITargetGenerated } from "@/types/dailyTurnoverPerformance";

export default function BranchPerformance() {
  const { data: session } = useSession();

  const [branch, setBranch] = useState<string>("");

  const [turnover, setTurnover] = useState<ITurnoverStatus[]>([]);
  const [branchWiseFund, setBranchWiseFund] = useState<IBranchWiseFund[]>([]);
  const [branchWiseExposure, setBranchWiseExposure] = useState<
    IBranchWiseExposure[]
  >([]);
  const [branchWiseMargin, setBranchWiseMargin] = useState<IBranchWiseMargin[]>(
    [],
  );

  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };

  const [turnoverPerformance, setTurnoverPerformance] = useState<
    ITargetGenerated[]
  >([]);

  // on page load
  useEffect(() => {
    // fetch turnover status
    const fetchTurnoverStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/branchwise-turnover-status/?branch=${branch}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<ITurnoverStatus[]>;
        if (successResponse(result.status)) {
          setTurnover(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // fetch branch wise fund status
    const fetchBranchWiseFundStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/branchwise-fund-status/?branch=${branch}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<IBranchWiseFund[]>;
        if (successResponse(result.status)) {
          setBranchWiseFund(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // fetch branch wise fund status
    const fetchBranchWiseMarginStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/branchwise-margin-status/?branch=${branch}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<
          IBranchWiseMargin[]
        >;
        if (successResponse(result.status)) {
          setBranchWiseMargin(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // fetch branch wise fund status
    const fetchBranchWiseExposureStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/branchwise-exposure-status/?branch=${branch}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<
          IBranchWiseExposure[]
        >;
        if (successResponse(result.status)) {
          setBranchWiseExposure(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // TODO: Need to think of other way to fetch date for header
    const fetchDailyTurnoverPerformance = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/daily-trade-performance/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = (await response.json()) as IResponse<ITargetGenerated[]>;
        if (successResponse(result.status)) {
          setTurnoverPerformance(result.data);
        }
      } catch (error) {
        console.error(`Error Happened while fetching Summary`, error);
      }
    };

    fetchDailyTurnoverPerformance();
    fetchTurnoverStatus();
    fetchBranchWiseFundStatus();
    fetchBranchWiseMarginStatus();
    fetchBranchWiseExposureStatus();
  }, [branch]);

  let headerDate = null;

  if (turnoverPerformance) {
    headerDate = getHeaderDate(
      turnoverPerformance[turnoverPerformance.length - 1],
      "tradingDate",
    );
  }

  return (
    <div className="mx-4">
      <title>Branch Performance - LBSL</title>
      <meta name="description" content="branch performance analytics" />
      <PageHeader name={`Branch Performance (${headerDate ?? ""})`}>
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
      </PageHeader>
      <div className="grid grid-cols-1 gap-3 mt-2 lg:grid-cols-4">
        {/* Branch Wise Turnover Status */}
        <DataTableCard
          title="Branch Wise Turnover Status"
          subtitle="show data for branch wise turnover"
          className="col-span1 max-h[700px] overflow-y-auto lg:col-span-2 lg:row-span-2"
          columns={branchWiseTurnoverColumns}
          data={turnover}
        />

        {/* Branch Wise Margin Status */}
        <Card className="col-span-1 max-h-[340px] overflow-y-auto lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="">Branch Wise Margin Status</CardTitle>
            <CardDescription>shows the grid for margin status</CardDescription>
          </CardHeader>
          <CardContent>
            <BranchWiseMarginDataTable records={branchWiseMargin} />
          </CardContent>
        </Card>

        {/* Branch Wise Exposure Status */}
        <Card className="col-span-1 max-h-[340px] overflow-y-auto shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="">Branch Wise Exposure Status</CardTitle>
            <CardDescription>
              shows the grid for exposure status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BranchWiseExposureDataTable records={branchWiseExposure} />
          </CardContent>
        </Card>

        {/* Branch Wise Fund Status */}
        <DataTableCard
          className="col-span-4 mb-2"
          title="Branch Wise Fund Status(Till Today)"
          subtitle="summary of fund status branch wise"
          columns={branchWiseFundColumns}
          data={branchWiseFund}
        />
      </div>
    </div>
  );
}
