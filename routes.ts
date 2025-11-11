export const authRoutes = [
    "/auth/login",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";
export const DEFAULT_ADMIN_REDIRECT_TRADING_CODE = "/dashboard/active-trading-codes"
export const DEFAULT_ADMIN_REDIRECT_BUSINESS_MANAGEMENT = "/dashboard/business-and-trade-management"
export const DEFAULT_ADMIN_REDIRECT_TRADE_INSIGHT = "/dashboard/trade-insights"
export const DEFAULT_ADMIN_REDIRECT_CUSTOMER_MANAGEMENT = "/dashboard/customer-management"
export const DEFAULT_MANAGEMENT_REDIRECT = "/dashboard/live-trade-status"
export const DEFAULT_RM_REDIRECT = "/dashboard/rm/live-trade-status"


export const PUBLIC_ROUTES = [
    "/auth/login",
]

export const PROTECTED_ROUTES = [
    "/",
    "/dashboard/active-trading-codes",
    "/dashboard/business-and-trade-management",
]