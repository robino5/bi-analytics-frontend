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