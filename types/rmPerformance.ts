export interface ITurnoverPerformance {
    name: string;
    daily: number;
    forthnightly: number;
    monthly: number;
    weekly: number;
    quarterly: number;
}

export interface IClientDetail {
    branchCode: number;
    branchName: string;
    traderId: string;
    investorCode: string;
    joinHolderName: string;
    tpv: number;
    cv: number;
    intAmount: number;
    availableCashBalance: number;
    loanBalance: number;
    equity: number;
    exposureOnEquity: number;
    dailyTurnover: number;
    weeklyTurnover: number;
    fortnightlyTurnover: number;
    monthlyTurnover: number;
}

export type InvestorLiveTradeInfo = {
  branchCode: number;
  branchName: string;
  traderId: string;
  investorCode: string;
  joinHolderName: string;
  buy: number;
  sell: number;
  net: number;
  ledgerBalance: number;
  turnover: number;
};

export interface RMAuctionInfo {
  regionName: string;
  branchCode: number;
  branchName: string;
  rmName: string;
  auctionFund: number;
  auctionIncome: number;
  year: number;
}

export interface RMOffMarketInfo {
  regionName: string;
  branchCode: number;
  branchName: string;
  rmName: string;
  offMarketFund: number;
  offMarketIncome: number;
  year: number;
}
