export interface MarketSpotDataInvestorDrilldown {
  symbol: string;
  investorCode: string;
  investorName: string;
  accountType: string;
  currentBalance: number;
  ledgerBalance: number;
  spotBuyQty: number;
  spotBuyAmount: number;
  cashDeposit: number;
  nonCashDeposit: number;
  usedExcessLbslFund: number;
  fundUsingLevel: string;
  rmBranch: string;
  rmName: string;
}

export interface MarketZGroupDataInvestorDrilldown {
  symbol: string;
  investorCode: string;
  investorName: string;
  accountType: string;
  currentBalance: number;
  ledgerBalance: number;
  zBuyQty: number;
  zBuyAmount: number;
  cashDeposit: number;
  nonCashDeposit: number;
  usedExcessLbslFund: number;
  fundUsingLevel: string;
  rmBranch: string;
  rmName: string;
}

export interface MarketNegativeEquityHoldingScrip {
  companyName: string;
  companyCode: string;
  freeQty: number;
  lockQty: number;
  totalInvestor: number;
  avgPrice: number;
  ltp: string | number;
  marketValue: number;
  lastWeekPrice: number;
}

export interface EventTypeCount {
  id: number;
  eventType: string;
  eventCount: string;
}