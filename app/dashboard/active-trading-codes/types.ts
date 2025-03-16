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
    pushDate: string;
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
            sumOfTotalClientToday: number,
            sumOfTurnoverToday: number,
            sumOfTotalClientMonth: number,
            sumOfTurnoverMonth: number
        };
        rows: {
            branch_Name: string;
            activeClientsToday:number;
            turnoverToday:number
            activeClientsMonth: number;
            turnoverMonth: number;
        }[];
    };
};

export type SectorWiseTurnoverTop20 = {
    date: string; 
    name:string;
    value: number;
    buy: number;
    sell: number;   
}

export type SectorWiseTurnover = { 
    name:string;
    value: number;   
}

export type ExchnageSectorWiseTurnover = {
    date: string; 
    name:string;
    primaryValue: number;
    secondaryValue:number;
    secondaryPercent:number;
    pushDate: string;
}


export type SectorWiseTurnoverBreakdown = { 
    name:string;
    value: number;
}

export type SectorWiseTurnoverComparison = { 
    name:string;
    primaryValue: number;
    secondaryValue: number;
}