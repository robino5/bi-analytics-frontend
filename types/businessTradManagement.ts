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