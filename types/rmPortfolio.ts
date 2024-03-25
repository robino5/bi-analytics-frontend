export interface IFundCollection {
    name: string;
    daily: number;
    forthnightly: number;
    monthly: number;
    weekly: number;
}

export interface IMarkedClient {
    investorCode: string;
    branchCode: number;
    investorName: string;
    ledgerBalance: number;
    rmName: string;
}

export interface IPortfolioManagement {
    particular: string;
    amount: number;
}

export interface INetFundFlow {
    tradingDate: string;
    amount: number;
}