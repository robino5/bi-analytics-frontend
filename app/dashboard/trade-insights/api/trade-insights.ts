import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { AdminRealtimeTopRmTurnover } from "../types";
import { IResponse } from "@/types/utils";
import { InvestorLiveTradeInfo } from "@/types/rmPerformance";
import { InvestorLiveTopBuySaleInfo } from "../../business-and-trade-management/types";
import { IActiveTradingToday, SectorWiseTurnoverComparison, SectorWiseTurnoverTop20 } from "../../active-trading-codes/types";


class TradeInsightAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }

    getRealtimeTopRMTurnover() {
        return this.http.get<IResponse<AdminRealtimeTopRmTurnover[]>>("dashboards/rm/realtime-top-rm-turnover/")
    }
    getInvestorLiveTrade() {
        return this.http.get<IResponse<InvestorLiveTradeInfo[]>>("/dashboards/rm/investor-live-trade-rm-wise/")
    }
    getTopTurnoverInvestor() {
        return this.http.get<IResponse<InvestorLiveTradeInfo[]>>("/dashboards/rm/top-turnover-investor/")
    }
    getInvestorLiveTopBuy() {
        return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>("/dashboards/admin/live-investor-top-buy-rm-wise/")
    }
    getInvestorLiveTopSale() {
        return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>("/dashboards/admin/live-investor-top-sale-rm-wise/")
    }
    getClientTradeSummaryByToday() {
        return this.http.get<IResponse<IActiveTradingToday[]>>("dashboards/active-trading-today/")
    }
    getSectorwiseTurnoverTop20() {
        return this.http.get<IResponse<SectorWiseTurnoverTop20[]>>("dashboards/admin-realtime-turnover-top-20/")
    }
    getCompanyPERation() {
        return this.http.get<IResponse<any[]>>("dashboards/dse-traded-company-list/")
    }
    getCompanyPERSI(companyID: any) {
        return this.http.get<any>(`dashboards/portal-pe-rsi-company-wise/?company_code=${companyID}`)
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const tradeInsightAPI = new TradeInsightAPI(httpAuthService);