import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { IActiveTradingToday } from "../types";
import { SectorWiseTurnoverComparison } from "../../active-trading-codes/types";


class BranchActiveTradingCodeAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }

    getBranchwiseClientTradeSummaryByToday(branch: string) {
        if (branch) {
            return this.http.get<IResponse<IActiveTradingToday[]>>(`dashboards/rm/branch-wise-rm-oms-realtime-summary/?branch=${branch}`)
        }
        else {
            return this.http.get<IResponse<IActiveTradingToday[]>>("dashboards/rm/branch-wise-rm-oms-realtime-summary/")
        }
    }

    getRmWLiveTurnoverSectorWise(branch: string) {
        if (branch) {
            return this.http.get<IResponse<SectorWiseTurnoverComparison[]>>(`dashboards/rm/rm-live-turnover-sectorwise/?branch=${branch}`)
        }
        else {
            return this.http.get<IResponse<SectorWiseTurnoverComparison[]>>("dashboards/rm/rm-live-turnover-sectorwise/")
        }
    }


}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const branchActiveTradingCodeAPI = new BranchActiveTradingCodeAPI(httpAuthService);