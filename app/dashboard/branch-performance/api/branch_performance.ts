import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { IBranchWiseExposure, IBranchWiseFund, IBranchWiseMargin, ITurnoverStatus } from "@/types/branchPerformance";
import { ITargetGenerated } from "@/types/dailyTurnoverPerformance";


class BranchPerformanceAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getTurnoverStatus(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITurnoverStatus[]>>(`dashboards/branchwise-turnover-status/?branch=${branch}`)
        }
        else {
            return this.http.get<IResponse<ITurnoverStatus[]>>("dashboards/branchwise-turnover-status/")
        }
    }
    getBranchWiseFundStatus(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IBranchWiseFund[]>>(`dashboards/branchwise-fund-status/?branch=${branch}`)
        }
        else {
            return this.http.get<IResponse<IBranchWiseFund[]>>("dashboards/branchwise-fund-status/")
        }
    }
    getBranchWiseMarginStatus(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IBranchWiseMargin[]>>(`dashboards/branchwise-margin-status/?branch=${branch}`)
        }
        else {
            return this.http.get<IResponse<IBranchWiseMargin[]>>("dashboards/branchwise-margin-status/")
        }
    }

    getBranchWiseExposureStatus(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IBranchWiseExposure[]>>(`dashboards/branchwise-exposure-status/?branch=${branch}`)
        }
        else {
            return this.http.get<IResponse<IBranchWiseExposure[]>>("dashboards/branchwise-exposure-status/")
        }
    }

    getDailyTurnoverPerformance(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITargetGenerated[]>>(`dashboards/daily-trade-performance/?branch=${branch}`)
        }
        else {
            return this.http.get<IResponse<ITargetGenerated[]>>("dashboards/daily-trade-performance/")
        }
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const branchPerformanceAPI = new BranchPerformanceAPI(httpAuthService);