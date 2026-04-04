import { CallApiDTO } from "../dtos/axios.dto";
import Axios from 'axios'
import { ApiServiceType } from "../utils/types.util";
import storage from "../utils/storage.util";
import { IAPIResponse } from "../utils/interfaces.util";

class AxiosService {

    public baseUrl: string;
    public client: ReturnType<typeof Axios.create>;
    private isLoggingOut: boolean;
    constructor() {

        if (!import.meta.env.VITE_APP_API_URL) {
            throw new Error('API base url not defined')
        }

        Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        this.baseUrl = import.meta.env.VITE_APP_API_URL;
        this.client = Axios.create();
        this.isLoggingOut = false;

        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error?.response?.status;
                const path = error?.config?.url || '';
                console.debug('[auth][axios] response:error', {
                    status,
                    path,
                    shouldLogout: this.shouldLogoutOnStatus(path, status)
                });

                if (this.shouldLogoutOnStatus(path, status) && !path.includes('/auth/logout')) {
                    this.handleUnauthorized();
                }

                return Promise.reject(error);
            }
        );

    }

    private handleUnauthorized(): void {

        if (this.isLoggingOut) {
            console.debug('[auth][axios] handleUnauthorized:skipped', { reason: 'already logging out' });
            return;
        }

        console.debug('[auth][axios] handleUnauthorized:start', {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userId'),
            role: localStorage.getItem('role'),
            path: typeof window !== 'undefined' ? window.location.pathname : null
        });
        this.isLoggingOut = true;
        storage.clearAuth();

        if (typeof window !== 'undefined') {
            const authPaths = ['/login', '/register', '/reset-password', '/verify'];
            const isAuthPage = authPaths.some((route) => window.location.pathname.includes(route));

            if (!isAuthPage) {
                window.location.href = '/login';
            }
        }

        setTimeout(() => {
            this.isLoggingOut = false;
            console.debug('[auth][axios] handleUnauthorized:reset');
        }, 250);

    }

    private shouldLogoutOnStatus(path: string, status?: number): boolean {

        if (status !== 401 && status !== 403) {
            return false;
        }

        const normalizedPath = path.replace(this.baseUrl, '');

        return (
            normalizedPath.includes('/auth/user') ||
            /^\/users\/[^/]+$/.test(normalizedPath)
        );

    }

    /**
     * @name call
     * @param params 
     * @returns 
     */
    public async call(params: CallApiDTO): Promise<IAPIResponse> {

        let result: any = {}
        const { isAuth = false, method, path, type, payload } = params;

        let urlpath = `${this.baseUrl}${path}`;

        await this.client({
            method: method,
            url: urlpath,
            data: payload,
            headers: isAuth ? storage.getConfigWithBearer().headers : storage.getConfig().headers
        }).then((resp) => {
            result = resp.data;
        }).catch((err) => {

            if (err.response) {

                if (err.response.status === 404) {
                    result.error = true;

                    if (err.response.data.errors) {
                        result.errors = err.response.data.errors
                    } else if (err.response.data.message) {
                        result.message = err.response.data.message
                    } else {
                        result.message = 'unable to get requested resource';
                    }

                    result.data = null;
                } else if (err.response.status === 502) {
                    result.error = true;

                    if (err.response.data.errors) {
                        result.errors = err.response.data.errors
                    } else if (err.response.data.message) {
                        result.message = err.response.data.message
                    } else {
                        result.message = 'unable to get requested resource';
                    }

                    result.data = null;
                } else {

                    if (err.response.data) {
                        result = err.response.data;
                    } else {
                        result.error = true;
                        result.errors = ['an error occured'];
                        result.message = 'An error occured';
                        result.data = null;
                    }

                }

            } else if (typeof (err) === 'object') {
                result.error = true;
                result.errors = ['an error occurred. please try again']
                result.message = 'Error';
                result.data = err;
            } else if (typeof (err) === 'string') {
                result.error = true;
                result.errors = [err.toString()]
                result.message = err.toString();
                result.data = err.toString()
            }

        })

        // console.log('RESPONSE', result)

        return result;

    }

    /**
     * @name logout
     */
    public async logout(): Promise<void> {

        storage.clearAuth()
        await this.call({
            method: 'POST',
            type: 'default',
            path: '/auth/logout',
            isAuth: false,
            payload: {}
        });

    }

}

export default new AxiosService()
