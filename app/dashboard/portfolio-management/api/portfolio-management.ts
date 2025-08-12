import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { IAccountsFundFlow, INetFundFlow, IPortfolioStatus, ITradeVsClients, ITurnoverPerformance } from "@/types/portfolioManagement";


class PortfolioManagementAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getDailyNetFundFlow(branch: string) {
        if (branch) {
            return this.http.get<IResponse<INetFundFlow[]>>(`dashboards/daily-net-fundflow/${branch}`)
        }
        else {
            return this.http.get<IResponse<INetFundFlow[]>>("dashboards/daily-net-fundflow/")
        }
    }
    getTradeVsClientsWithBranchId(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITradeVsClients[]>>(`dashboards/trade-vs-clients/${branch}`)
        }
        else {
            return this.http.get<IResponse<ITradeVsClients[]>>("dashboards/trade-vs-clients/")
        }
    }
    getTurnoverPerformanceWithBranchId (branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITurnoverPerformance[]>>(`dashboards/turnover-performance/${branch}`)
        }
        else {
            return this.http.get<IResponse<ITurnoverPerformance[]>>("dashboards/turnover-performance/")
        }
    }
        getAccountsFundFlow(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IAccountsFundFlow[]>>(`dashboards/accounts-fundflow/${branch}`)
        }
        else {
            return this.http.get<IResponse<IAccountsFundFlow[]>>("dashboards/accounts-fundflow/")
        }
    }
           getPortfolioStatus(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IPortfolioStatus[]>>(`dashboards/portfolio-status/${branch}`)
        }
        else {
            return this.http.get<IResponse<IPortfolioStatus[]>>("dashboards/portfolio-status/")
        }
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const portfolioManagementAPI = new PortfolioManagementAPI(httpAuthService);