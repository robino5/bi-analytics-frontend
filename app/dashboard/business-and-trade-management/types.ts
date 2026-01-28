export interface BoardWiseTurnoverData {
    tradingDate: string;     
    board: string;          
    turnover: number;         
    dsePercentage: number;    
    lbslTurnover: number;     
    lbslPercentage: number;   
  }

  export interface BoardWiseTurnoverBreakdownData {
    tradingDate: string;     
    board: string;          
    turnover: number;         
    dsePercentage: number;    
    lbslTurnover: number;     
    lbslPercentage: number;   
  }

  export interface MarketShareLBSl{
    tradingDate: string;     
    lbslBuyOfDse: number;        
    lbslSaleOfDse: number;      
    lbslTotalOfDse: number;        
    dseMarketTurnover: number;     
    lbslShareOfDse: number;     
    lbslBuyOfCse: number;        
    lbslSaleOfCse: number;        
    lbslTotalOfCse: number;      
    cseMarketTurnover: number;     
    lbslShareOfCse: number;       
    lbslTotalTurnover: number;     
    exchTotalMarket: number;      
    lbslMarketAll: number;         
    foreign: number ;       
    netIncome: number;           
}

export interface MarketShareSME {
  tradingDate: string; 
  dseSmeTurnover: number; 
  dseAtbTurnover: number; 
  dseGsecTurnover: number; 
  dseBlockTurnover: number;
  smePercent: number; 
  atbPercent: number; 
  cseSmeTurnover: number 
  cseAtbTurnover: number 
  cseGsecTurnover: number 
  cseBlockTurnover: number; 
  cseSmePercent: number 
  cseAtbPercent: number; 
}

export interface CompanyWiseTotalSelableStock {
  companyName: string;
  stockAvailable: number;
}

export interface SelableStockPercentage {
  companyName: string;             
  branchName: string;              
  stockAvailable: number;           
  stockAvailablePercentage: number; 
}

export interface InvestorWiseTotalSelableStock {
  companyName: string; 
  branchName: string;      
  investorCode: string;    
  clientName: string;      
  rmName: string;         
  stockAvailable: number;  
}

export type InvestorLiveTopBuySaleInfo = {
  branchCode: number;
  branchName: string;
  rmName: string;
  investorCode: string;
  investorName: string;
  turnover: number;
  clientType: string;
}

export type TraderPerformance = {
  branchCode: number;
  branchName: string;
  traderId: string;
  traderName: string;
  empNumber: string;
  yearlyBo: number;
  yearlyFund: number;
  dailyTraded: number;
  commission: number;
  newBo: number;
  totalLinkShareIn: number;
  totalLinkShareOut: number;
  totalNetLinkShare: number;
  totalDeposit: number;
  totalWithdrawal: number;
  totalNetFund: number;
  regionName: string;
  clusterName: string;
};

