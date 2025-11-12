export interface DepositData {
  detail: {
    totalDeposit: number;
    branchCode: number;
    branchName: string;
    cashDeposit: number;
    chequeDeposit: number;
    scbDeposit: number;
    payOrder: number;
    cashDividend: number;
    ipoMode: number;
  };
  rows: BranchDeposit[];
};


export interface BranchDeposit {
  branchCode: number;
  branchName: string;
  cashDeposit: number;
  chequeDeposit: number;
  scbDeposit: number;
  payOrder: number;
  cashDividend: number;
  ipoMode: number;
}


export interface withdrawalData {
  detail: {
    totalWithdrawal: number;
    branchCode: number;
    branchName: string;
    cashWithdrawal: number;
    chequeWithdrawal: number;
    onlineRequisition: number;
    rtsg: number;
    payOrder: number;
    cashDividendDeduction: number;
    ipoMode: number;
  };
  rows: BranchWithdrawal[];
};


export interface BranchWithdrawal {
  branchCode: number;
  branchName: string;
  cashWithdrawal: number;
  chequeWithdrawal: number;
  onlineRequisition: number;
  rtgs: number;
  payOrder: number;
  cashDividendDeduction: number;
  ipoMode: number;
}


type MonthlyWiseData = {
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
};

type BranchData = {
  branchCode: number;
  branchName: string;
} & MonthlyWiseData;

export type MonthlyDepositResponse = {
  data: {
    monthlyWise: MonthlyWiseData;
    rows: BranchData[];
  };
};



