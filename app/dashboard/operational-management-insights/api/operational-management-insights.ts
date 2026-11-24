import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { IResponse } from "@/types/utils";

class OperationalManagementInsights extends Common {
  constructor(private http: HttpAuthService) {
    super();
  }
  getRegionalEkycDetails(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-eKYC-details/`;
    return this.http.get<IResponse<any>>(url, { signal });
  }
  getRegionalClientPerformanceNonPerformance(signal?: AbortSignal) {
    let url = `dashboards/branch-wise-regional-client-performance-nonperformance/`;

    return this.http.get<IResponse<any>>(url, { signal });
  }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const OperationalManagementInsightsAPI =
  new OperationalManagementInsights(httpAuthService);
