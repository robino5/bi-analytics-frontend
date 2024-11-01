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
  