import config from "@/config";
import { authService } from "@/lib/auth";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { IResponse } from "@/types/utils";
import {
  EventTypeCount,
  MarketNegativeEquityHoldingScrip,
  MarketSpotDataInvestorDrilldown,
  MarketZGroupDataInvestorDrilldown,
} from "../types";

class MarketAndTradeInsightAPI extends Common {
  private readonly http: HttpAuthService;

  constructor(http: HttpAuthService) {
    super();
    this.http = http;
  }

  getMarketSpotDataInvestorDrilldown() {
    return this.http.get<IResponse<MarketSpotDataInvestorDrilldown[]>>(
      "dashboards/market-spot-data-investor-drilldown/",
    );
  }
  getMarketZGroupDataInvestorDrilldown() {
    return this.http.get<IResponse<MarketZGroupDataInvestorDrilldown[]>>(
      "dashboards/market-zgroup-data-investor-drilldown/",
    );
  }

  getNegativeEquityHoldingScrips(signal?: AbortSignal) {
    return this.http.get<IResponse<MarketNegativeEquityHoldingScrip[]>>(
      "dashboards/market-negative-equity-holding-scrip-analysis/",
      { signal },
    );
  }

  getAdminEventCountData() {
    return this.http.get<EventTypeCount[]>(
      "dashboards/portal-live-event-types-count/",
    );
  }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const marketAndTradeInsightAPI = new MarketAndTradeInsightAPI(
  httpAuthService,
);
