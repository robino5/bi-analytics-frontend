import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { DepositData, withdrawalData, MonthlyDepositResponse } from "../types";
import { IResponse } from "@/types/utils";

class CustomerFundFlowAPI extends Common {
  constructor(private http: HttpAuthService) {
    super();
  }
  getTotalDepositToday() {
    return this.http.get<IResponse<DepositData>>(
      "dashboards/admin/total-deposit-branch-wise-today/",
    );
  }
  getTotalDepositThisYear() {
    return this.http.get<IResponse<DepositData>>(
      "dashboards/admin/total-deposit-branch-wise-this-year/",
    );
  }
  getTotalWithdrawalToday() {
    return this.http.get<IResponse<withdrawalData>>(
      "dashboards/admin/total-withdrawal-branch-wise-today/",
    );
  }
  getTotalWithdrawalThisYear() {
    return this.http.get<IResponse<withdrawalData>>(
      "dashboards/admin/total-withdrawal-branch-wise-this-year/",
    );
  }
  getTotalDepositBranchWiseMonthly() {
    return this.http.get<IResponse<MonthlyDepositResponse>>(
      "dashboards/admin/total-deposit-branch-wise-monthly/",
    );
  }
  getTotalWithdrawBranchWiseMonthly() {
    return this.http.get<IResponse<MonthlyDepositResponse>>(
      "dashboards/admin/total-withdrawal-branch-wise-monthly/",
    );
  }
  getDailySSLTransactionData() {
    return this.http.get<IResponse<any>>(
      "dashboards/admin/day-wise-ssl-details/",
    );
  }
  getYearSSLTransactionData() {
    return this.http.get<IResponse<any>>(
      "dashboards/admin/year-wise-ssl-details/",
    );
  }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const customerFundFlowAPI = new CustomerFundFlowAPI(httpAuthService);
