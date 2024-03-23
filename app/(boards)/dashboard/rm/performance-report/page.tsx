"use client";

import PageHeader from "@/components/PageHeader";
import BranchFilter from "@/components/branchFilter";
import TraderFilter from "@/components/traderFilter";
import { useSession } from "next-auth/react";

import React, { useState } from "react";
import RMTurnoverPerformance from "./_rmTurnvoerPerformance";

import { DataTable as RMClientsDataTable } from "./_clientsDataTable";
import { rmWiseClientsColumns } from "./_clientTableColumns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RmPerformanceBoard = () => {
  const { data: session } = useSession();

  const [trader, setTrader] = useState("");
  const [branch, setBranch] = useState("");
  const [traders, setTraders] = useState([]);

  const [turnoverPerformance, setTurnoverPerformance] = useState([]);
  const [clients, setClients] = useState([]);

  const handleBranchChange = async (branchId: string) => {
    setBranch(branchId);
    setTrader("");
  };

  const handleTraderChange = async (value: string) => {
    setTrader(value);
  };

  return (
    <div className="mx-4">
      <PageHeader name="RM Performance Report">
        <BranchFilter onChange={handleBranchChange} />
        <TraderFilter
          traders={traders}
          currentTrader={trader}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-col-6 gap-3 xl:grid-cols-6 mt-2">
        {/* Turnover Performance */}
        {turnoverPerformance ? (
          <RMTurnoverPerformance records={turnoverPerformance} />
        ) : null}
        {/* Client Details */}
        {clients ? (
          <Card className="w-full h-[83vh] col-span-1 mb-2 shadow-xl lg:col-span-4 bg-gradient-to-br from-gray-50 to-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-600">Client Details</CardTitle>
              <CardDescription>
                Client Details for Regional Managers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RMClientsDataTable
                data={clients}
                columns={rmWiseClientsColumns}
              />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default RmPerformanceBoard;
