import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { BranchWiseNonePerformClient, IMarginLoanUsage, ISectorExposure, ISummaryDetails, ITargetGenerated, RmWiseDailyTradeData, VisitData } from "@/types/dailyTurnoverPerformance";
import { InvestorLiveTopBuySaleInfo } from "../../business-and-trade-management/types";
import { InvestorLiveTradeInfo } from "@/types/rmPerformance";


class DailyTradePerformanceAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }

    getSummary(branch: string) {
        if(branch){
            return this.http.get<IResponse<ISummaryDetails>>(`dashboards/basic-summaries/${branch}`)
        }
        else{
            return this.http.get<IResponse<ISummaryDetails>>("dashboards/basic-summaries/")
        }
    }

    getDailyTurnoverPerformance(branch: string) {
        if(branch){
            return this.http.get<IResponse<ITargetGenerated[]>>(`dashboards/daily-trade-performance/${branch}`)
        }
        else{
            return this.http.get<IResponse<ITargetGenerated[]>>("dashboards/daily-trade-performance/")
        }
    }
    getDailyMarginLoanUsageWithBranchId(branch: string) {
        if(branch){
            return this.http.get<IResponse<IMarginLoanUsage[]>>(`dashboards/margin-loan-usage/${branch}`)
        }
        else{
            return this.http.get<IResponse<IMarginLoanUsage[]>>("dashboards/margin-loan-usage/")
        }
    }
      getCashCodeSectorExposureWithBranchId (branch: string) {
        if(branch){
            return this.http.get<IResponse<ISectorExposure[]>>(`dashboards/sector-exposure-cashcode/${branch}`)
        }
        else{
            return this.http.get<IResponse<ISectorExposure[]>>("dashboards/sector-exposure-cashcode/")
        }
    }
      getMarginCodeSectorExposureWithBranchId (branch: string) {
        if(branch){
            return this.http.get<IResponse<ISectorExposure[]>>(`dashboards/sector-exposure-margincode/${branch}`)
        }
        else{
            return this.http.get<IResponse<ISectorExposure[]>>("dashboards/sector-exposure-margincode/")
        }
    }
      geteCrmDetails (branch: string) {
        if(branch){
            return this.http.get<IResponse<VisitData>>(`dashboards/rm/ecrm-details/?branch=${branch}`)
        }
        else{
            return this.http.get<IResponse<VisitData>>("dashboards/rm/ecrm-details/")
        }
    }
        getRmWiseDailyTradeData (branch: string) {
        if(branch){
            return this.http.get<IResponse<RmWiseDailyTradeData[]>>(`dashboards/rm/daily-trade-data/?branch=${branch}`)
        }
        else{
            return this.http.get<IResponse<RmWiseDailyTradeData[]>>("dashboards/rm/daily-trade-data/")
        }
    }
        getTopInvestorSaleData (branch: string) {
        if(branch){
            return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>(`dashboards/admin/live-investor-top-sale-rm-wise/?branch=${branch}`)
        }
        else{
            return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>("dashboards/admin/live-investor-top-sale-rm-wise/")
        }
    }
       getTopInvestorBuyData  (branch: string) {
        if(branch){
            return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>(`dashboards/admin/live-investor-top-buy-rm-wise/?branch=${branch}`)
        }
        else{
            return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>("dashboards/admin/live-investor-top-buy-rm-wise/")
        }
    }
        getInvestorLiveTradeDetails (branch: string) {
        if(branch){
            return this.http.get<IResponse<InvestorLiveTradeInfo[]>>(`dashboards/rm/investor-live-trade-rm-wise/?branch=${branch}`)
        }
        else{
            return this.http.get<IResponse<InvestorLiveTradeInfo[]>>("dashboards/rm/investor-live-trade-rm-wise/")
        }
    }

       getBranchWiseNonePerforminigClients(branch: string) {
        if(branch){
            return this.http.get<IResponse<BranchWiseNonePerformClient[]>>(`dashboards/branchwise-none-performing-client/?branch=${branch}`)
        }
        else{
            return this.http.get<IResponse<BranchWiseNonePerformClient[]>>("dashboards/branchwise-none-performing-client/")
        }
    }



}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const dailyTradePerformanceAPI = new DailyTradePerformanceAPI(httpAuthService);