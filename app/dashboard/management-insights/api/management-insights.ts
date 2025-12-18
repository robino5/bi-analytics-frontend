import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { RegionType } from "../types";
import { IResponse } from "@/types/utils";


class ManagementInsights extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getRegionsBranch() {
        return this.http.get<IResponse<RegionType>>("dashboards/lov/regions/")
    }

    getRegionalEmployeeStructure(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-employee-structure/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }

    getRegionalClientPerformanceNonPerformance(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-client-performance-nonperformance/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }

    getRegionalEcrmDetails(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-eCRM-details/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }

    getRegionalEkycDetails(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-eKYC-details/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }


    getRegionalChannelWiseTrade(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-channel-wise-trades/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }

    getRegionalPartyTurnoverCommission(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-party-wise-turnover-commission/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }

    getRegionalDepositWithdrawDetails(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-deposit-withdraw-details/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }

    getRegionalExposureDetails(branch?: string, region?: string) {
        let url = `dashboards/branch-wise-regional-exposure-details/?`;

        if (region) {
            url += `region_name=${region}&`;
        }
        if (branch) {
            url += `branch_code=${branch}&`;
        }

        return this.http.get<IResponse<any>>(url);
    }

}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const ManagementInsightsAPI = new ManagementInsights(httpAuthService);