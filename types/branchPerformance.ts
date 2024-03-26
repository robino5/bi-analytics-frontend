export interface ITurnoverStatus {
    branchCode: number;
    branchName: string;
    turnoverDaily: number;
    turnoverWeekly: number;
    turnoverMonthly: number;
    turnoverYearly: number;
}

export interface IBranchWiseFund {
    branchCode: number;
    branchName: string;
    tpv: number;
    totalClients: number;
    fundIn: number;
    fundWithdrawl: number;
    netFundflow: number;
}

export interface IBranchWiseMargin {
    branchCode: number;
    branchName: string;
    turnoverDaily: number;
    turnoverWeekly: number;
    turnoverMonthly: number;
    turnoverYearly: number;
    loanUsed: number;
}

interface Exposure {
    branchCode: number;
    branchName: string;
    exposureType: string;
    investorsCount: number;
    exposureRatio: number;
}

export interface IBranchWiseExposure {
    branchName: string;
    exposures: {
        green?: Exposure;
        yellow?: Exposure;
        red?: Exposure;
    };
}