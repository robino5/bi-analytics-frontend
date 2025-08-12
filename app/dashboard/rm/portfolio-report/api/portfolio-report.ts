import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { ITrader } from "@/components/traderFilter";
import { ISummaryDetails } from "@/types/dailyTurnoverPerformance";


class PortfolioReport extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getTraderWithBranchId(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITrader[]>>(`dashboards/lov/traders/${branch}/`)
        }
    }
    
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const portfolioReport = new PortfolioReport(httpAuthService);