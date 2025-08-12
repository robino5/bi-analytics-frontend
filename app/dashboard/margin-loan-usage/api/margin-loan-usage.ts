import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { IExposureSumamry, IMarginLoanAllocation, IMarkedClient, INetTradeClient } from "@/types/marginLoanUsage";
import { ITargetGenerated } from "@/types/dailyTurnoverPerformance";


class MarginLoanUsageAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getMarginLoanAllocation(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IMarginLoanAllocation[]>>(`dashboards/margin-loan-allocations/${branch}`)
        }
        else {
            return this.http.get<IResponse<IMarginLoanAllocation[]>>("dashboards/margin-loan-allocations/")
        }
    }
    getExposureSummary(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IExposureSumamry[]>>(`dashboards/exposure-list/${branch}`)
        }
        else {
            return this.http.get<IResponse<IExposureSumamry[]>>("dashboards/exposure-list/")
        }
    }
    getNetTradeClients(branch: string) {
        if (branch) {
            return this.http.get<IResponse<INetTradeClient[]>>(`dashboards/rmwise-net-trades/${branch}`)
        }
        else {
            return this.http.get<IResponse<INetTradeClient[]>>("dashboards/rmwise-net-trades/")
        }
    }
    getNegativeEquityInvistor(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IMarkedClient[]>>(`dashboards/zonewise-investors/?investor_type=negative_equity${branch}`)
        }
        else {
            return this.http.get<IResponse<IMarkedClient[]>>("dashboards/zonewise-investors/?investor_type=negative_equity")
        }
    }

   getDailyTurnoverPerformance() {
            return this.http.get<IResponse<ITargetGenerated[]>>("dashboards/daily-trade-performance/")
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const marginLoanUsageAPI = new MarginLoanUsageAPI(httpAuthService);