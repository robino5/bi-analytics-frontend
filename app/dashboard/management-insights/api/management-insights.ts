import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { RegionType, BranchPerformanceRunLog } from "../types";
import { IResponse } from "@/types/utils";

class ManagementInsights extends Common {
  constructor(private http: HttpAuthService) {
    super();
  }
  getRegionsBranch() {
    return this.http.get<IResponse<RegionType>>("dashboards/lov/regions/");
  }

  getRegionalEmployeeStructure(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-employee-structure/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalClientPerformanceNonPerformance(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-client-performance-nonperformance/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalEcrmDetails(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-eCRM-details/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalEkycDetails(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-eKYC-details/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalChannelWiseTrade(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-channel-wise-trades/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalPartyTurnoverCommission(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-party-wise-turnover-commission/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalDepositWithdrawDetails(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-deposit-withdraw-details/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalExposureDetails(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-exposure-details/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any>>(url);
  }

  getRegionalOfficeSpace(branch?: string, region?: string) {
    let url = `dashboards/branch-wise-regional-office-space/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any[]>>(url);
  }

  getBranchPerformanceProcess() {
    return this.http.get<IResponse<BranchPerformanceRunLog>>(
      "dashboards/branch-performance-process/",
    );
  }

  async processBranchPerformanceWithDates(
    startDate?: string,
    endDate?: string,
  ): Promise<IResponse<any>> {
    const apiPath = `dashboards/sp/branch-performance/`;
    const requestURL = `${config.apiURL}/${apiPath}`;

    const token = authService.getToken?.();
    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    try {
      const res = await fetch(
        `${requestURL}?end_date=${endDate}&start_date=${startDate}`,
        {
          method: "POST",
          headers,
        },
      );

      if (res.ok) {
        return (await res.json()) as IResponse<any>;
      }

      if (res.status === 401) {
        authService.removeTokens?.();
      }

      const errorBody = await res.json().catch(() => null);
      throw new Error(errorBody?.message || "Something went wrong");
    } catch (err) {
      if (err instanceof Error) throw err;
      throw new Error("Something went wrong");
    }
  }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const ManagementInsightsAPI = new ManagementInsights(httpAuthService);
