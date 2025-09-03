import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { IActiveTradingToday } from "../types";
import { ITrader } from "@/components/traderFilter";
import { SectorWiseTurnoverComparison } from "@/app/dashboard/active-trading-codes/types";


class RMActiveTradingCodeAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }

    getTraderWithBranchId(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITrader[]>>(`dashboards/lov/traders/${branch}/`)
        }
    }

    getBranchwiseClientTradeSummaryByToday(branch: string, trader?: string) {

        let url = `dashboards/rm/branch-wise-rm-oms-realtime-summary/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<IActiveTradingToday[]>>(url)
    } 


    getRmWLiveTurnoverSectorWise(branch: string, trader?: string) {
        let url = `dashboards/rm/rm-live-turnover-sectorwise/?branch=${branch}`;
        if (trader) {
            url += `&trader=${trader}`;
        }
        return this.http.get<IResponse<SectorWiseTurnoverComparison[]>>(url)
    }


}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const rmActiveTradingCodeAPI = new RMActiveTradingCodeAPI(httpAuthService);