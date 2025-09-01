import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import { DseLiveDsex, DseLiveTrade } from "@/types/dseLiveTradeType";


class DseLiveTradeAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }

    getDseLiveTradeData() {
        return this.http.get<DseLiveTrade>("/dashboards/portal-dse-live-trade/");
    }

    getDseLiveDsexData() {
        return this.http.get<DseLiveDsex[]>("/dashboards/portal-live-dse-dsex/");
    }

    getDseLiveDsexSumData() {
        return this.http.get<[]>("/dashboards/portal-live-dse-dsex-summary/");
    }
    getLiveMarketSentiment() {
        return this.http.get<number>("dashboards/live-market-sentiment/");
    }
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const dseLiveTradeAPI = new DseLiveTradeAPI(httpAuthService);