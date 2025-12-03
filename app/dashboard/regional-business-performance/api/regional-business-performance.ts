import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import {RegionType} from "../types";
import { IResponse } from "@/types/utils";


class RegionalBusinessPerformanceAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getRegionsBranch() {
        return this.http.get<IResponse<RegionType>>("dashboards/lov/regions/")
    }

}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const regionalBusinessPerformanceAPI = new RegionalBusinessPerformanceAPI(httpAuthService);