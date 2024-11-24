import { AuthService } from '@/lib/auth';
import { HttpService } from './http.service';

export class HttpAuthService extends HttpService {
    constructor(baseURL: string, private auth: AuthService) {
        super(baseURL, {
            getToken: () => this.auth.getToken(),
            onUnauthorised: () => {
                this.auth.removeTokens();
                this.auth.removeAppCookies('authjs.session-token')
            },
            onLoading: (e) => e,
        });
    }
}
