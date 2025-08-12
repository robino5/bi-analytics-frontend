import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { ITrader } from "@/components/traderFilter";
import { ISummaryDetails } from "@/types/dailyTurnoverPerformance";


class DailyTradePerformance extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getTraderWithBranchId(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITrader[]>>(`dashboards/lov/traders/${branch}/`)
        }
    }
     getSummaryWithTraderId(branch: string,trader:string) {
        if (branch) {
            return this.http.get<IResponse<ISummaryDetails>>(`dashboards/rm/basic-summaries/?branch=${branch}`)
        }
        else if (branch && trader){
            return this.http.get<IResponse<ISummaryDetails>>(`dashboards/rm/basic-summaries/?branch=${branch}/&trader=${trader}`)
        }
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const dailyTradePerformance = new DailyTradePerformance(httpAuthService);