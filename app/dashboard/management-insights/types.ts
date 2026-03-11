export interface RegionType {
branchCode: number,
branchName: string,
regionName: string,
regionId: number,
managerName: string
};

export type BranchPerformanceRunLog = {
  procedureName: string;
  dateFrom: string;
  dateTo: string;
  runTime: string;
};

