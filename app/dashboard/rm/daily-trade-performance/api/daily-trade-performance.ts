import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { ITrader } from "@/components/traderFilter";
import { ISectorExposure, ISummaryDetails, ITargetGenerated, RmWiseDailyTradeData, VisitData } from "@/types/dailyTurnoverPerformance";


class DailyTradePerformance extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getTraderWithBranchId(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITrader[]>>(`dashboards/lov/traders/${branch}/`)
        }
    }
    getSummaryWithTraderId(branch: string, trader?: string) {
        let url = `dashboards/rm/basic-summaries/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<ISummaryDetails>>(url)
    }
    getEcrmDetails(branch: string, trader?: string) {
        let url = `dashboards/rm/ecrm-details/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<VisitData>>(url)
    }
    getDailyTurnoverPerformanceWithTraderId(branch: string, trader?: string) {
        let url = `dashboards/rm/daily-trade-performance/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<ITargetGenerated[]>>(url)
    }
    getCashCodeSectorExposureWithTraderId(branch: string, trader?: string) {
        let url = `dashboards/rm/sector-exposure-cashcode/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<ISectorExposure[]>>(url)
    }
    getMarginCodeSectorExposureWithTraderId(branch: string, trader?: string) {
        let url = `dashboards/rm/sector-exposure-margincode/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<ISectorExposure[]>>(url)
    }
    getRmWiseDailyTradeData(branch: string, trader?: string) {
        let url = `dashboards/rm/daily-trade-data/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<RmWiseDailyTradeData[]>>(url)
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const dailyTradePerformance = new DailyTradePerformance(httpAuthService);