import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { RegionType } from "../types";
import { IResponse } from "@/types/utils";


class MarketInsightsBranchPerformance extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getRegionsBranch() {
        return this.http.get<IResponse<RegionType>>("dashboards/lov/regions/")
    }


    getExchangeWiseMarketStatistics(exchange?: string) {
        let url = `dashboards/exchange-wise-market-statistics/`;
        if (exchange) {
            url += `&region_name=${exchange}`;
        }
        return this.http.get<IResponse<any>>(url)
    }

   getBranchWiseMarketStatistics(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-market-statistics/`;

    if (region) {
        url += `?region_name=${region}`;
    }
    if (branch) {
        url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
}

   getBranchWiseRegionalBusinessPerformance(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-business-performance/`;

    if (region) {
        url += `?region_name=${region}`;
    }
    if (branch) {
        url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
}



}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const regionalBusinessPerformanceAPI = new MarketInsightsBranchPerformance(httpAuthService);