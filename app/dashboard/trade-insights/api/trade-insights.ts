import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { AdminRealtimeTopRmTurnover } from "../types";
import { IResponse } from "@/types/utils";
import { InvestorLiveTradeInfo } from "@/types/rmPerformance";
import { InvestorLiveTopBuySaleInfo } from "../../business-and-trade-management/types";


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
    getInvestorLiveTopBuy() {
        return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>("/dashboards/admin/live-investor-top-buy-rm-wise/")
    }
    getInvestorLiveTopSale() {
        return this.http.get<IResponse<InvestorLiveTopBuySaleInfo[]>>("/dashboards/admin/live-investor-top-sale-rm-wise/")
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const tradeInsightAPI = new TradeInsightAPI(httpAuthService);