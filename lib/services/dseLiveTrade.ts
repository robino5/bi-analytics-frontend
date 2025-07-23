import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import {DseLiveTrade } from "@/types/dseLiveTradeType";


class DseLiveTradeAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
   
    getDseLiveTradeData() {
        return this.http.get<DseLiveTrade>("/dashboards/portal-dse-live-trade/");
    }

}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const dseLiveTradeAPI = new DseLiveTradeAPI(httpAuthService);