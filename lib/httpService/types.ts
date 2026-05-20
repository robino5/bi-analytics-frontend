export type RequestOptions = {
    headers?: Record<string, string>;
    signal?: AbortSignal;
};

export type RequestBody = string | FormData | null;

export type HttpServiceConfig = {
    getToken?: () => string | null;
    getRefreshToken?: () => string | null;
    onUnauthorised?: () => void;
    // eslint-disable-next-line no-unused-vars
    onLoading?: (status: 'start' | 'error' | 'complete') => void;
};

