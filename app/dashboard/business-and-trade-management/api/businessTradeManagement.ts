import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { BoardWiseTurnoverData,BoardWiseTurnoverBreakdownData,MarketShareSME,MarketShareLBSl,InvestorLiveTopBuySaleInfo, DateWiseTopTurnoverData} from "../types";
import { IResponse } from "@/types/utils";
import { InvestorLiveTradeInfo } from "@/types/rmPerformance";


class BusinessTradeManagementAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getBoardTernoverData() {
        return this.http.get<IResponse<BoardWiseTurnoverData[]>>("/dashboards/admin/board-turnover/")
    }

    getBoardTernoverBreakdownData() {
        return this.http.get<IResponse<BoardWiseTurnoverBreakdownData[]>>("/dashboards/admin/board-turnovers-breakdown/")
    }
    getMarketShareLBSL () {
        return this.http.get<IResponse<MarketShareLBSl[]>>("/dashboards/admin/market-share-details/")
    }
    getMarketShareSME() {
        return this.http.get<IResponse<MarketShareSME[]>>("/dashboards/admin/atb-market-share-details/")
    }
    getDateWiseTopTurnover() {
        return this.http.get<IResponse<DateWiseTopTurnoverData[]>>("/dashboards/admin/date-wise-top-ten-turnover/")
    }
    getDateWiseTopInternetTurnover() {
        return this.http.get<IResponse<DateWiseTopTurnoverData[]>>("/dashboards/admin/date-wise-top-ten-internet-turnover/")
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const businessTradeManagementAPI = new BusinessTradeManagementAPI(httpAuthService);