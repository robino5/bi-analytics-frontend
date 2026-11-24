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
