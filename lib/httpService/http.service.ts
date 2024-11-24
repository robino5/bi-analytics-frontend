import {ErrorException} from '@/utils';
import {HttpServiceConfig, RequestBody, RequestOptions} from './types';

export class HttpService {
    constructor(private readonly baseURL: string, private config: HttpServiceConfig = {}) {
        this.baseURL = baseURL;
        this.config = config;
    }

    get<T>(url: string, options?: RequestOptions) {
        return this.request<T>('GET', url, null, options);
    }

    post<T>(url: string, body: unknown, options?: RequestOptions) {
        return this.request<T>('POST', url, JSON.stringify(body), options);
    }

    put<T>(url: string, body: unknown, options?: RequestOptions) {
        return this.request<T>('PUT', url, JSON.stringify(body), options);
    }

    patch<T>(url: string, body: unknown, options?: RequestOptions) {
        return this.request<T>('PATCH', url, JSON.stringify(body), options);
    }

    delete<T>(url: string, options?: RequestOptions) {
        return this.request<T>('DELETE', url, null, options);
    }

    upload<T>(url: string, formData: FormData, options?: RequestOptions) {
        return this.request<T>('POST', url, formData, options);
    }


    private async request<T>(
        method: string,
        url: string,
        body: RequestBody,
        options?: RequestOptions
    ): Promise<T> {
        this.config.onLoading?.("start");
        const requestURL = `${this.baseURL}/${url}`;

        // Request headers
        const token = this.config.getToken?.();
        const headers: RequestOptions['headers'] = {
            'content-type': 'application/json',
            ...options?.headers,
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        if (body instanceof FormData) {
            delete headers['content-type'];
        }

        // Send request
        try {
            const response = await fetch(requestURL, {
                method,
                headers,
                body,
            });

            if (response.ok) {
                try {
                    return await response.json();
                } catch (error) {
                    return {} as T;
                }
            }

            // Unauthorised
            // redirect the user here
            if (response.status === 401) {
                this.config.onUnauthorised?.();
            }

            const error = await response.json();
            throw new ErrorException(error || 'Something went wrong');
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error?.message || 'Something went wrong');
            }
            throw new Error('Something went wrong');
        }finally {
            this.config.onLoading?.("complete");
        }
    }
}
