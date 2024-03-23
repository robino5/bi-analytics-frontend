export interface INetFundFlow {
  tradingDate: string;
  amount: number;
}

export interface ITradeVsClients {
  tradingDate: string;
  activeClients: number;
  turnover: number;
}

export interface ITurnoverPerformance {
  name: string;
  daily: number;
  weekly: number;
  monthly: number;
  forthnightly: number;
}

export interface IAccountsFundFlow extends ITurnoverPerformance {}

export interface IPortfolioStatus {
  perticular: string;
  amount: number;
}
