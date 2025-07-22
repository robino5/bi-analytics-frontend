import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import {TiketDataType } from "@/types/tickerType";
import { IResponse } from "@/types/utils";


class TickerAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
   
    getTickerData() {
        return this.http.get<TiketDataType[]>("/dashboards/portal-live-tickers/");
    }

}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const ticketAPI = new TickerAPI(httpAuthService);