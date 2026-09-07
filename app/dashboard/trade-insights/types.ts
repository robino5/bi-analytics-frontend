export interface AdminRealtimeTopRmTurnover {
  branchCode: number;
  rmName: string;
  totalTurnOverToday: number;
  totalCommission: number;
  totalYearlyComm: number;
  maxTurnOver: number;
  tradingDate: string; // ISO datetime string
  rankNo: number;
  branchName: string;
}

export interface AdminMarketRiskData {
  symbol: string;
  riskLevel: string;
  lbsFreeFloatSalable: number;
  buyQty: number;
  sellQty: number;
  blockPbContactToday: number;
  holdingLive: number;
  freeFloatSalable: number;
  sectorName: string;
  marketCategory: string;
  dse30: string;
  mLoanListed: string;
  lbsHoldingPercent: number;
  marginQtyPercentage: number;
  thirdPartyPercentage: number;
  inHouseTransaction: number;
}