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

export type PayloadType = {
    monthYear: string;
    DT: number;
    INTERNET: number;
}


export interface IMonthWiseData {
    totalClients: PayloadType[];
    totalTrades: PayloadType[];
    totalTurnover: PayloadType[];
}