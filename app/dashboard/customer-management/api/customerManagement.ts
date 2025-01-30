import config from "@/config";
import { Common } from "@/lib/api/common";
import { HttpAuthService } from "@/lib/httpService";
import { authService } from "@/lib/auth";
import {ClientSegmentationData,BranchWiseClintsNumberData,BranchWiseNonPerformerClintsData,LBSLTurnoverSegmentationData,EquityValueSegmentationData,
    LedgerValueSegmentationData,DetailsMarketShareLBSLData,PortfolioValueSegmentationData,GsecTurnoverType,GsecTurnoverComparisonType
} from "../types";
import { IResponse } from "@/types/utils";


class CustomerManagementAPI extends Common {
    constructor(private http: HttpAuthService) {
        super()
    }
    getClientSegmentation() {
        return this.http.get<IResponse<ClientSegmentationData>>("/dashboards/admin/customer-management/client-segmentations/")
    }
    getBranchWiseClientRatio() {
        return this.http.get<IResponse<BranchWiseClintsNumberData>>("/dashboards/admin/customer-management/branchwise-client-ratio/")
    }
    getBranchWiseNonPerformerClient () {
        return this.http.get<IResponse<BranchWiseNonPerformerClintsData>>("/dashboards/admin/customer-management/branchwise-non-performers/")
    }
    getLBSLTurnoverSegmentation() {
        return this.http.get<IResponse<LBSLTurnoverSegmentationData>>("/dashboards/admin/customer-management/turnover-segmentation/")
    }
    getEquityValueSegmentation() {
        return this.http.get<IResponse<EquityValueSegmentationData>>("/dashboards/admin/customer-management/equity-segmentation/")
    }
    getLedgerValueSegmentation() {
        return this.http.get<IResponse<LedgerValueSegmentationData>>("/dashboards/admin/customer-management/ledger-segmentation/")
    }
    getDetailsMarketShareLBSL() {
        return this.http.get<IResponse<DetailsMarketShareLBSLData>>("/dashboards/admin/customer-management/market-share-segmentation/")
    }
    getPortfolioValueSegmentation() {
        return this.http.get<IResponse<PortfolioValueSegmentationData>>("/dashboards/admin/customer-management/tpv-segmentation/")
    }
    getGsecTurmover() {
        return this.http.get<IResponse<GsecTurnoverType>>("/dashboards/admin/customer-management/gsec-turnover/")
    }
    getGsecTurmoverComparison() {
        return this.http.get<IResponse<GsecTurnoverComparisonType>>("/dashboards/admin/customer-management/gsec-turnover-comparison/")
    }

}

const httpAuthService = new HttpAuthService(config.apiURL, authService);

export const customerManagementAPI = new CustomerManagementAPI(httpAuthService);