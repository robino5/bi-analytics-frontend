import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IActiveTradingToday, IActiveTradeDayWise, IMonthWiseData,DatewiseTurnover,BranchData,SectorWiseTurnover,SectorWiseTurnoverBreakdown } from "../types";
import { IResponse } from "@/types/utils";


class ActiveTradingCodeAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }

    getClientTradeSummaryByToday() {
        return this.http.get<IResponse<IActiveTradingToday[]>>("dashboards/active-trading-today/")
    }

    getStatisticsByDay() {
        return this.http.get<IResponse<IActiveTradeDayWise[]>>("dashboards/active-trading-daywise/")
    }

    getStatisticsByMonth() {
        return this.http.get<IResponse<IMonthWiseData>>("dashboards/active-trading-monthwise/")
    }
    getDatewiseTurnover(){
        return this.http.get<IResponse<DatewiseTurnover>>("dashboards/admin-oms-datewise-turnover/")
    }
    getBranchwiseTurnover(){
        return this.http.get<IResponse<BranchData>>("dashboards/admin-oms-branchwise-turnover/")
    }
    getSectorwiseTurnover(){
        return this.http.get<IResponse<SectorWiseTurnover[]>>("dashboards/admin-sector-wise-turnover/")
    }
    getSectorwiseTurnoverBreakdown(name: string){
        return this.http.get<IResponse<SectorWiseTurnoverBreakdown[]>>(`dashboards/admin-sector-wise-turnover-breakdown/?sector_name=${name}`)
    }

}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const activeTradingCodeAPI = new ActiveTradingCodeAPI(httpAuthService);