export interface ClientSegmentation {
    customerCategory: string;
    totalClients: number;
  }

  export interface BranchWiseClintsNumber {
    branchName: string;
    branchCode: number;
    totalClients: number;
    totalClientPercentage: number;
  }

  export interface BranchWiseNonPerformerClints {
    branchName: string;
    branchCode: number;
    totalClients: number;
    totalClientPercentage: number;
  }

  export interface LBSLTurnoverSegmentation {
    customerCategory: string;
    turnover: number;
  }

  
  export interface EquityValueSegmentation {
    customerCategory: string;
    equity: number;
  }

  export interface LedgerValueSegmentation {
    customerCategory: string;
    margin: number;
  }

  export interface DetailsMarketShareLBSL {
    year: number;     
    month: string;
    turnoverDse: number;
    turnoverLbsl: number;
    tradePercentage: number;
  }

  export interface PortfolioValueSegmentation {
    customerCategory: string;
    freeQty: number;
    lockQty: number;
    tpvTotal: number;
    tpvFreeQtyPercentage: number;
    tpvLockQtyPercentage: number;
  }
  