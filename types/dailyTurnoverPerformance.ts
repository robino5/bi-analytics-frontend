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

export interface ISummaryDetails {
    shortSummary: IShortSummary;
    cashCodeSummary: ICashCodeSummary;
    marginCodeSummary: IMarginCodeSummary;
}