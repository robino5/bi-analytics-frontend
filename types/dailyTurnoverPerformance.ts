export interface IPayload {
    name: string;
    value: number;
}

export interface IShortSummary {
    totalClients: IPayload;
    totalActiveClients: IPayload;
    dailyTurnover: IPayload;
    netBuySell: IPayload;
}

export interface ICashCodeSummary {
    cashBalance: IPayload;
    cashStockBalance: IPayload;
    cashDailyTurnover: IPayload;
    cashActiveClients: IPayload;
}

export interface IMarginCodeSummary {
    marginBalance: IPayload;
    marginStockBalance: IPayload;
    marginActiveClients: IPayload;
    marginDailyTurnover: IPayload;
}

export type ISummaryDetails ={
    shortSummary: IShortSummary;
    cashCodeSummary: ICashCodeSummary;
    marginCodeSummary: IMarginCodeSummary;
}


export interface ITargetGenerated {
    label: string;
    generated: number;
    target: number;
    tradingDate: string;
}
export interface IMarginLoanUsage {
    label: string;
    totalAllocated: number;
    dailyUsage: number;
}

export interface ISectorExposure {
    name: string;
    value: number;
}

export interface VisitData {
    total_Visits: number;
    success: number;
    inProgress: number;
    discard: number;
    existingClientVisit: number;
  }


  export interface RmWiseDailyTradeData{
    pushDate: string;
    branchCode: number;
    branch: string;
    rmName: string;
    totalClientToday: number;
    totalTurnoverToday: number;
  };

  export interface BranchWiseNonePerformClient {
  branchCode: number;
  branchName: string;
  rmName: string;
  investorCode: string;
  investorName: string;
  availableBalance: number;
  mobile: string;
  email: string;
}