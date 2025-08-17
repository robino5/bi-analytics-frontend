export interface IMarginLoanAllocation {
    perticular: string;
    amount: number;
}

export interface IExposureSumamry {
    exposure: string;
    investors: number;
    loanAmount: number;
}

export interface IMarkedClient {
    investorCode: string;
    branchCode: number;
    investorName: string;
    ledgerBalance: number;
    exposure:number;
    equity:number
    rmName: string;
}

export interface INetTradeClient {
    branchCode: string;
    branchName: string;
    investorCode: string;
    openingBalance: number;
    endingBalance: number;
    netBuysell: number;
    rmName: string;
}
