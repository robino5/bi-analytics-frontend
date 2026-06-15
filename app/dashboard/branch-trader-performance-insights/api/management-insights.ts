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
  getRegionsBranch(signal?: AbortSignal) {
    return this.http.get<IResponse<RegionType>>("dashboards/lov/regions/", {
      signal,
    });
  }

  getRegionalEmployeeStructure(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-employee-structure/`;
    return this.http.get<IResponse<any>>(url, { signal });
  }

  getRegionalClientPerformanceNonPerformance(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-client-performance-nonperformance/`;

    return this.http.get<IResponse<any>>(url, { signal });
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

  getRegionalPartyTurnoverCommission(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-party-wise-turnover-commission/`;
    return this.http.get<IResponse<any>>(url, { signal });
  }

  getRegionalDepositWithdrawDetails(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-deposit-withdraw-details/`;

    return this.http.get<IResponse<any>>(url, { signal });
  }

  getRegionalExposureDetails(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-exposure-details/`;
    return this.http.get<IResponse<any>>(url, { signal });
  }

  getRegionalOfficeSpace(
    branch?: string,
    region?: string,
    signal?: AbortSignal,
  ) {
    let url = `dashboards/branch-wise-regional-office-space/`;

    if (region) {
      url += `?region_name=${region}`;
    }
    if (branch) {
      url += `&branch_code=${branch}`;
    }

    return this.http.get<IResponse<any[]>>(url, { signal });
  }

  getExchangeWiseMarketStatistics(exchange?: string, signal?: AbortSignal) {
    let url = `dashboards/exchange-wise-market-statistics/`;
    return this.http.get<IResponse<any>>(url, { signal });
  }

  getBranchWiseMarketStatistics(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-market-statistics/`;
    return this.http.get<IResponse<any>>(url, { signal });
  }

  getBranchWiseRegionalBusinessPerformance(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-business-performance/`;

    return this.http.get<IResponse<any>>(url, { signal });
  }

   getBranchWiseAdminRegionalManagerRMBusinessPerformance(signal?: AbortSignal) {
    let url = `dashboards/admin-regional-manager-rm-business-performance/`;

    return this.http.get<IResponse<any>>(url, { signal });
  }

  getBranchPerformanceProcess(signal?: AbortSignal) {
    return this.http.get<IResponse<BranchPerformanceRunLog>>(
      "dashboards/branch-performance-process/?procedure_name=BIAnalytics_Region_Wise_MarketInsight_BranchPerformance_Date_Duration",
      { signal },
    );
  }

  async processRegionWiseManagement(
    startDate?: string,
    endDate?: string,
  ): Promise<IResponse<any>> {
    const apiPath = `dashboards/sp/region-wise-management/`;
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
