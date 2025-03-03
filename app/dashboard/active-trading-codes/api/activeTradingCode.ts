import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IActiveTradingToday, IActiveTradeDayWise, IMonthWiseData,DatewiseTurnover,BranchData,SectorWiseTurnover,SectorWiseTurnoverBreakdown, SectorWiseTurnoverComparison, ExchnageSectorWiseTurnover, SectorWiseTurnoverTop20 } from "../types";
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
    getSectorwiseTurnoverTop20(){
        return this.http.get<IResponse<SectorWiseTurnoverTop20[]>>("dashboards/admin-realtime-turnover-top-20/")
    }
    getExchangeSectorwiseTurnoverTop20(){
        return this.http.get<IResponse<ExchnageSectorWiseTurnover[]>>("dashboards/admin-realtime-turnover-comparison-top20-sector-wise/")
    }
    getSectorwiseTurnoverBreakdown(name: string){
        return this.http.get<IResponse<SectorWiseTurnoverBreakdown[]>>(`dashboards/admin-sector-wise-turnover-breakdown/?sector_name=${name}`)
    }
    getSectorWiseTurnoverComparison(){
        return this.http.get<IResponse<SectorWiseTurnoverComparison[]>>("dashboards/admin-realtime-turnover-comparison-sector-wise/")
    }

}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const activeTradingCodeAPI = new ActiveTradingCodeAPI(httpAuthService);