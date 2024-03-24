export interface ITurnoverPerformance {
    name: string;
    daily: number;
    forthnightly: number;
    monthly: number;
    weekly: number;
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