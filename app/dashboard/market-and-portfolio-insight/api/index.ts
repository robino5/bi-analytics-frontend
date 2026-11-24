import config from "@/config";
import { authService } from "@/lib/auth";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { IResponse } from "@/types/utils";
import { MarketNegativeEquityHoldingScrip } from "../types";

class MarketAndTradeInsightAPI extends Common {
  private readonly http: HttpAuthService;

  constructor(http: HttpAuthService) {
    super();
    this.http = http;
  }

  getNegativeEquityHoldingScrips(signal?: AbortSignal) {
    return this.http.get<IResponse<MarketNegativeEquityHoldingScrip[]>>(
      "dashboards/market-negative-equity-holding-scrip-analysis/",
      { signal },
    );
  }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const marketAndTradeInsightAPI = new MarketAndTradeInsightAPI(
  httpAuthService,
);
