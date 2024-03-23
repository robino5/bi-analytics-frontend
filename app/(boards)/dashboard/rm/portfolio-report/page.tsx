"use client";

import PageHeader from "@/components/PageHeader";
import BranchFilter from "@/components/branchFilter";
import TraderFilter from "@/components/traderFilter";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import RMFundCollectionTable from "./_rmFundCollection";
import PortfolioManagementStatusDataTable from "./_rmPortfolioStatus";
import CardBoard from "@/components/CardBoard";
import BarChartPositiveNegative from "@/components/BarChartPositiveNegative";
import { BarColors } from "@/components/ui/utils/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RmPortfolioBoard = () => {
  const { data: session } = useSession();
  const [branch, setBranch] = useState("");
  const [trader, setTrader] = useState("");
  const [traders, setTraders] = useState([]);

  const [fundCollections, setFundCollection] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [netFundFlow, setNetFundFlow] = useState([]);

  const handleBranchChange = (value: string) => {
    setBranch(value);
    setTrader("");
  };
  const handleTraderChange = (value: string) => {
    setTrader(value);
  };

  const dailyNetFundFlowOption = {
    dataKey: "tradingDate",
    valueKey: "amount",
    fill: BarColors.orange,
    stroke: "#c3ce",
    barLabel: true,
  };

  return (
    <div className="mx-4">
      <PageHeader name="RM Portfolio Report">
        <BranchFilter onChange={handleBranchChange} />
        <TraderFilter
          traders={traders}
          currentTrader={trader}
          onChange={handleTraderChange}
        />
      </PageHeader>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-6 mt-4">
        {/* Fund Collection Status */}
        {fundCollections ? (
          <RMFundCollectionTable records={fundCollections} />
        ) : null}

        {/* Portfolio Management Status */}
        {portfolio ? (
          <PortfolioManagementStatusDataTable records={portfolio} />
        ) : null}

        {/* Daily Net Fund Flow Chart */}
        {netFundFlow ? (
          <CardBoard
            className="lg:col-span-4"
            title="Daily Net Fund Flow"
            subtitle="short summary of the portfolio"
            children={
              <BarChartPositiveNegative
                data={netFundFlow as any}
                options={dailyNetFundFlowOption}
              />
            }
          />
        ) : null}

        {/* Zonal Marked Investors */}
        <Tabs defaultValue="account" className="col-span-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're
                  done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RmPortfolioBoard;
