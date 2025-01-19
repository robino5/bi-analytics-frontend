export type DataType = {
    tradingDate: string;
    dt: number;
    internet: number;
    dtRatio: number;
    internetRatio: number;
};

export type TransformedDataItem = {
    tradingDate: string;
    dt: number;
    internet: number;
};

export type PayloadType = {
    monthYear: string;
    DT: number;
    INTERNET: number;
}

export interface IActiveTradingToday {
    channel: "DT" | "INTERNET" | "TOTAL (DT+INTERNET)";
    totalClients: number;
    trades: number;
    totalTurnover: number;
    tradingDate: string;
}

export interface IActiveTradeDayWise {
    tradingDate: string;
    channel: string;
    totalClients: number;
    trades: number;
    totalTurnover: number;
};


export interface IMonthWiseData {
    totalClients: PayloadType[];
    totalTrades: PayloadType[];
    totalTurnover: PayloadType[];
}


export interface DatewiseTurnover {
      detail: {
        sumOfTotalClient: number;
        sumOfTurnover: number;   
      };
      rows: {
        tradingDate: string;     
        activeClient: number;   
        turnover: number; 
      }[];
  }

export type BranchData = {
    data: {
        detail: {
            period: string;
            sumOfTotalClient: number;
            sumOfTurnover: number;
        };
        rows: {
            branch_Name: string;
            activeClients: number;
            turnover: number;
        }[];
    };
};