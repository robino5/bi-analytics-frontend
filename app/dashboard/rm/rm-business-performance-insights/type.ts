export interface IRmClientPerformance {
    regionName: string;
    branchCode: number;
    branchName: string;
    traderId: string;
    totalInvestor: number;
    texpressInvestor: number;
    ibrokerInvestor: number;
    performer: number;
    nonePerformer: number;
    performerPercentage: number;
    nonperformerPercentage: number;
}

export interface IRmEcrmDetails {
    regionName: string;
    clusterName: string;
    branchCode: number;
    branchName: string;
    traderId: string;
    totalVisits: number;
    totalSuccess: number;
    totalInProgress: number;
    totalDiscard: number;
    totalExistingClientVisit: number;
}

export interface IRmEkycDetails {
    regionName: string;
    clusterName: string;
    branchCode: number;
    branchName: string;
    traderId: string;
    totalInvestor: number;
    totalSubmitted: number;
    due: number;
}

export interface IRmChannelWiseTrades {
    regionName: string;
    branchCode: number;
    branchName: string;
    traderId: string;
    channel: string;
    totalClients: number;
    totalTrades: number;
    totalTurnover: number;
    pushDate: string;
}

export interface IRmBusinessPerformance {
    regionName: string;
    clusterName: string;
    branchCode: number;
    branchName: string;
    traderId: string;
    target: number;
    turnoverAchieved: number;
    turnoverPercentage: number;
    fundTarget: number;
    totalNetFund: number;
    totalNetLinkShare: number;
    fundPercentage: number;
    boOpeningTarget: number;
    boOpened: number;
    boPercentage: number;
    totalTradeDays: number;
    commission: number;
    totalLinkShareIn: number;
    totalLinkShareOut: number;
    totalDeposit: number;
    totalWithdrawal: number;
    totalExpenses: number;
    profitLoss: number;
    ctcDaily: number;
    ctcMonthly: number;
    ctcQuarterly: number;
    ctcYearly: number;
}
