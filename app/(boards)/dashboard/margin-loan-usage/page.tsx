"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import PageHeader from "@/components/PageHeader";
import { netTradeRmWiseColumns } from "./columns";
import { DataTable as NetTradeTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MarginLoanAllocationDataTable from "./_margin_loan_allocation_datatable";
import ExposureControllingDataTable from "./_exposure_controlling_datatable";
import {
  IExposureSumamry,
  IMarginLoanAllocation,
  INetTradeClient,
} from "@/types/marginLoanUsage";
import { successResponse } from "@/lib/utils";
import BranchFilter from "@/components/branchFilter";

export default function MarginLoanUsage() {
  const { data: session } = useSession();

  const [branch, setBranch] = useState("");

  const [marginLoanAllocation, setMarginLoanAllocation] = useState<
    IMarginLoanAllocation[]
  >([]);
  const [exposureSummary, setExposureSummary] = useState<IExposureSumamry[]>(
    []
  );
  const [netTradeClients, setNetTradeClients] = useState<INetTradeClient[]>([]);

  const handleBranchChange = (branchId: string) => {
    setBranch(branchId);
  };

  // effect on page load
  useEffect(() => {
    const fetchMarginLoanAllocation = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/margin-loan-allocations/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<
          IMarginLoanAllocation[]
        >;
        if (successResponse(result.status)) {
          setMarginLoanAllocation(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchExposureSummary = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/exposure-list/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<IExposureSumamry[]>;
        if (successResponse(result.status)) {
          setExposureSummary(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchNetTradeClients = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rmwise-net-trades/`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = (await response.json()) as IResponse<INetTradeClient[]>;
        if (successResponse(result.status)) {
          setNetTradeClients(result.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarginLoanAllocation();
    fetchExposureSummary();
    fetchNetTradeClients();
  }, []);
  // effect on page load
  useEffect(() => {
    if (branch) {
      const fetchMarginLoanAllocation = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/margin-loan-allocations/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IMarginLoanAllocation[]
          >;
          if (successResponse(result.status)) {
            setMarginLoanAllocation(result.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const fetchExposureSummary = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/exposure-list/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            IExposureSumamry[]
          >;
          if (successResponse(result.status)) {
            setExposureSummary(result.data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const fetchNetTradeClients = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_APIURL}/dashboards/rmwise-net-trades/${branch}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = (await response.json()) as IResponse<
            INetTradeClient[]
          >;
          if (successResponse(result.status)) {
            setNetTradeClients(result.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchMarginLoanAllocation();
      fetchExposureSummary();
      fetchNetTradeClients();
    }
  }, [branch]);

  return (
    <div className="mx-4">
      <title>Margin Loan Usage - LBSL</title>
      <meta name="description" content="analytics for margin loan usage" />
      <PageHeader name="Margin Loan Usage">
        <BranchFilter onChange={handleBranchChange} currentBranch={branch} />
      </PageHeader>
      <div className="grid grid-cols-1 gap-3 my-2 lg:grid-cols-6">
        <MarginLoanAllocationDataTable
          className="col-span-3"
          records={marginLoanAllocation}
        />
        <ExposureControllingDataTable
          className="col-span-3"
          records={exposureSummary}
          branch={branch}
        />
        <Card className="w-full col-span-1 mb-2 shadow-xl lg:col-span-6 bg-gradient-to-br from-gray-50 to-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-600">RM Wise Net Trade</CardTitle>
            <CardDescription>Net Trade for Regional Managers</CardDescription>
          </CardHeader>
          <CardContent>
            <NetTradeTable
              data={netTradeClients}
              columns={netTradeRmWiseColumns}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
