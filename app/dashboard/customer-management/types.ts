export interface ClientSegmentation {
  customerCategory: string;
  totalClients: number;
}

export interface ClientSegmentationDetails {
  sumOfClients: number;
}


export interface BranchWiseClintsNumber {
  branchName: string;
  branchCode: number;
  totalClients: number;
  totalClientPercentage: number;
}

export interface BranchWiseClintsNumberDetails {
  sumOfClients: number;
  sumOfClientsPercentage: number;
}

export interface BranchWiseNonPerformerClints {
  branchName: string;
  branchCode: number;
  totalClients: number;
  totalClientPercentage: number;
}

export interface BranchWiseNonPerformerClintsDetails {
  sumOfClients: number;
  sumOfClientsPercentage: number;
}

export interface LBSLTurnoverSegmentation {
  customerCategory: string;
  turnover: number;
}

export interface LBSLTurnoverSegmentationDetails {
  sumOfTurnovers: number;
}


export interface EquityValueSegmentation {
  customerCategory: string;
  equity: number;
}

export interface EquityValueSegmentationDetails {
  sumOfEquity: number;
}

export interface LedgerValueSegmentation {
  customerCategory: string;
  margin: number;
}

export interface LedgerValueSegmentationDetails {
  sumOfMargin: number;
}

export interface DetailsMarketShareLBSL {
  year: number;     
  month: string;
  turnoverDse: number;
  turnoverLbsl: number;
  tradePercentage: number;
}

export interface DetailsMarketShareLBSLDetails {
  sumOfTurnoverDse: number;
  sumOfTurnoverLbsl: number;
}

export interface PortfolioValueSegmentation {
  customerCategory: string;
  freeQty: number;
  lockQty: number;
  tpvTotal: number;
  tpvFreeQtyPercentage: number;
  tpvLockQtyPercentage: number;
}

export interface PortfolioValueSegmentationDetails {
  sumOfFreeQty: number;
  sumOfLockQty: number;
  sumOfTpvTotal: number;
  sumOfTpvFreeQtyPercentage: number;
  sumOfTpvLockQtyPercentage: number;
}

export interface GsecTurnoverDetails {
  sumOfTurnoverGsec:number
}

export interface GsecTurnover {
  tradingDate:string
  turnoverGsec:number
}

export interface GsecTurnoverComparisonDetails {
  sumOfTurnoverGsec:number,
  sumOfTurnover:number
}

export interface GsecTurnoverComparison {
  year:number
  turnoverGsec:number
  turnover:number
}

export interface ClientSegmentationData {
  detail: {
    sumOfClients: number;
  };
  rows: ClientSegmentation[];
}

export interface LBSLTurnoverSegmentationData {
  detail: {
    sumOfTurnovers: number;
  };
  rows: LBSLTurnoverSegmentation[];
}

export interface EquityValueSegmentationData {
  detail: {
    sumOfEquity: number;
  };
  rows: EquityValueSegmentation[];
}

export interface LedgerValueSegmentationData {
  detail: {
    sumOfMargin: number;
  };
  rows: LedgerValueSegmentation[];
}

export interface LedgerValueSegmentationData {
  detail: {
    sumOfMargin: number;
  };
  rows: LedgerValueSegmentation[];
}

export interface PortfolioValueSegmentationData {
  detail: PortfolioValueSegmentationDetails;
  rows: PortfolioValueSegmentation[];
}

export interface DetailsMarketShareLBSLData {
  detail: DetailsMarketShareLBSLDetails;
  rows: DetailsMarketShareLBSL[];
}

export interface BranchWiseClintsNumberData {
  detail: BranchWiseClintsNumberDetails;
  rows: BranchWiseClintsNumber[];
}

export interface BranchWiseNonPerformerClintsData {
  detail: BranchWiseNonPerformerClintsDetails;
  rows: BranchWiseNonPerformerClints[];
}

export interface GsecTurnoverType {
  detail: GsecTurnoverDetails;
  rows: GsecTurnover[];
}

export interface GsecTurnoverComparisonType {
  detail: GsecTurnoverComparisonDetails;
  rows: GsecTurnoverComparison[];
}


