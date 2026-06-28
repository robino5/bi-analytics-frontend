import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";
import { ITrader } from "@/components/traderFilter";
import {
    IRmClientPerformance,
    IRmEcrmDetails,
    IRmEkycDetails,
    IRmChannelWiseTrades,
    IRmBusinessPerformance
} from "../type";

class RMBusinessPerformanceInsights extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getTraderWithBranchId(branch: string) {
        if (branch) {
            return this.http.get<IResponse<ITrader[]>>(`dashboards/lov/traders/${branch}/`)
        }
    }

    getRegionalEcrmDetails(signal?: AbortSignal) {
        let url = `dashboards/branch-wise-regional-eCRM-details/`;
        return this.http.get<IResponse<any>>(url, { signal });
    }

    getRegionalEkycDetails(signal?: AbortSignal) {
        let url = `dashboards/branch-wise-regional-eKYC-details/`;
        return this.http.get<IResponse<any>>(url, { signal });
    }

    getRegionalChannelWiseTrade(
        branch?: string,
        region?: string,
        signal?: AbortSignal,
    ) {
        let url = `dashboards/branch-wise-regional-channel-wise-trades/`;

        if (region) {
            url += `?region_name=${region}`;
        }
        if (branch) {
            url += `&branch_code=${branch}`;
        }

        return this.http.get<IResponse<any>>(url, { signal });
    }
    getRegionalManagerBusinessPerformance(signal?: AbortSignal) {
        let url = `dashboards/admin-regional-manager-rm-business-performance/`;

        return this.http.get<IResponse<any>>(url, { signal });
    }
    getRegionalClientPerformanceNonPerformance(signal?: AbortSignal) {
        let url = `dashboards/branch-wise-regional-client-performance-nonperformance/`;

        return this.http.get<IResponse<any>>(url, { signal });
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const rmBusinessPerformanceInsights = new RMBusinessPerformanceInsights(httpAuthService);