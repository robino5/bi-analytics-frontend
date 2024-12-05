type Listner = (state: string | null) => void;


export class AuthService {
    private listners = new Set<Listner>();

    getToken() {
        return localStorage.getItem('token');
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
        this.listners.forEach((listner) => listner(token));
    }

    removeTokens() {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('refreshToken');
        this.listners.forEach((listner) => listner(null));
    }
}

export const authService = new AuthService();
