import  { useCallback, useEffect, useState } from 'react'
import useContextType from '../useContextType'
import useGoTo from '../useGoTo'
import CookieService from '../../services/cookie.service'
import storage from '../../utils/storage.util'
import routes from '../../routes/routes'
import AxiosService from '../../services/axios.service'
import { UserEnumType } from '../../utils/enums.util'
import { URL_FORGOT_PASSWORD, URL_LOGIN, URL_REGISTER, URL_RESET_PASSWORD, URL_USERS } from '../../utils/path.util'

interface IRegister {
    email: string,
    password: string,
    userType: string,
    callbackUrl: string,
    phoneCode: string,
    phoneNumber: string,
}

interface IVerify {
    code: string,
    url: string
}

interface ISendReset {
    email: string,
    type: string
}

interface IResetPassword {
    code: string,
    email: string,
    password: string
}

interface ILogin {
    email: string,
    password: string,
    method: 'email' | 'biometric',
}

interface IForcePassword {
    email: string,
    password: string
}

const resolveAuthPayload = (response: any) => {
    const payload = response?.data && typeof response.data === 'object'
        ? response.data
        : response || {};
    const user = payload?.user || response?.user || {};
    const role = user?.role || payload?.role || response?.role || '';

    return {
        token: payload?.token || response?.token || null,
        user,
        role,
        id: user?._id || payload?._id || response?._id || ''
    };
}

const useAuth = () => {

    const { goTo, location, navigate, toMainRoute } = useGoTo()
    const { userContext } = useContextType()

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const {
        users,
        user,
        userType,
        setUserType,
        currentSidebar,
        setLoading,
        unsetLoading
    } = userContext

    useEffect(() => {
        let ut = localStorage.getItem('role') || CookieService.getUserType();
        setUserType(ut ? ut : '');
    }, [])

    useEffect(() => {

        if (storage.checkToken() === false || storage.checkUserID() === false) {

            if (
                !location.pathname.includes('/login') && !location.pathname.includes('/home')) {
                goTo(location.pathname);
            } else {
                // AxiosService.logout()
                goTo('/login');
            }

        } else {

            setIsLoggedIn(true)
            currentSidebar(false)

            if (location.pathname === '/login' || location.pathname === '/home' || location.pathname === '/') {
                goTo('/dashboard')
            }

        }

    }, [navigate])

    useEffect(() => {
        let ut = localStorage.getItem('role') || CookieService.getUserType();
        setUserType(ut ? ut : '');
    }, [isLoggedIn])

    const logAuthCredentials = (data: { token: string, id: string, role: string }) => {

        // store auth credentials
        storage.storeAuth(data.token, data.id);
        storage.keepLegacy('role', data.role);
        setIsLoggedIn(true)

    }

    const redirect = (roles: Array<string>) => {

        if (storage.checkToken() === false || storage.checkUserID() === false) {
            goTo('/login');
        } else {

            const userType = localStorage.getItem('role') || CookieService.getUserType();
            const token = storage.getToken()

            if (token) {

                if (userType && !roles.includes(userType)) {
                    goTo('/login')
                } else {

                    setIsLoggedIn(true);
                    currentSidebar(false)

                    if (location.pathname === '/login' || location.pathname === '/home' || location.pathname === '/') {
                        goTo('/dashboard')
                    }

                }

            } else {
                goTo('/login')
            }

        }

    }

    const login = async (data: ILogin) => {

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            path: URL_LOGIN,
            isAuth: false,
            payload: { ...data }
        })

        if (!response.error) {

            const auth = resolveAuthPayload(response);

            if (!response.error) {

                const hasAllowedRole =
                    auth.role === UserEnumType.BUSINESS ||
                    auth.role === UserEnumType.ADMIN ||
                    auth.role === UserEnumType.SUPER;

                if (hasAllowedRole && auth.token && auth.id) {

                    logAuthCredentials({
                        id: auth.id,
                        token: auth.token,
                        role: auth.role
                    });

                    return response;

                } else {

                    const errors: Array<string> = [];

                    if (!auth.token) {
                        errors.push('Login response did not include a token');
                    }

                    if (!auth.id) {
                        errors.push('Login response did not include a user id');
                    }

                    if (!auth.role) {
                        errors.push('Login response did not include a role');
                    } else if (
                        auth.role !== UserEnumType.BUSINESS &&
                        auth.role !== UserEnumType.ADMIN &&
                        auth.role !== UserEnumType.SUPER
                    ) {
                        errors.push(`Role "${auth.role}" is not allowed to access this portal`);
                    }

                    return {
                        ...response,
                        error: true,
                        errors: errors.length > 0 ? errors : (response.errors || []),
                        message: errors[0] || response.message || 'Login failed'
                    };

                }

            }

            if (response.status === 206) {

            }

        }

        return response

    }

    const logout = () => {
        storage.clearAuth()
        goTo('/login')
    }

    const register = useCallback(async (data: IRegister) => {

        setLoading({ option: 'default' })

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            path: URL_REGISTER,
            isAuth: false,
            payload: { ...data }
        })

        if (!response.error) {
            setIsLoggedIn(false)
            unsetLoading({
                option: 'default',
                message: 'successful'
            })
        }

        return response

    }, [setLoading])

    const activateAccount = useCallback(async (data: IVerify) => {

        setLoading({ option: 'default' })

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            path: data.url,
            isAuth: false,
            payload: {
                code: data.code
            }
        })

        if (!response.error) {
            setIsLoggedIn(false)
            unsetLoading({
                option: 'default',
                message: 'successful'
            })
        }

        return response

    }, [setLoading])

    const sendResetLink = useCallback(async (data: ISendReset) => {

        setLoading({ option: 'default' })

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            path: URL_FORGOT_PASSWORD,
            isAuth: false,
            payload: { ...data }
        })

        if (!response.error) {
            setIsLoggedIn(false)
            unsetLoading({
                option: 'default',
                message: 'successful'
            })
        }

        return response

    }, [setLoading])

    const resetPassword = useCallback(async (data: IResetPassword) => {

        setLoading({ option: 'default' })

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            path: URL_RESET_PASSWORD,
            isAuth: false,
            payload: { ...data }
        })

        if (!response.error) {
            setIsLoggedIn(false)
            unsetLoading({
                option: 'default',
                message: 'successful'
            })
        }

        return response

    }, [setLoading])

    const forcePassword = useCallback(async (data: IForcePassword) => {

        setLoading({ option: 'default' })

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            path: `/auth/force-password`,
            isAuth: false,
            payload: data
        })

        if (!response.error) {
            unsetLoading({
                option: 'default',
                message: 'successful'
            })
        } else {
            unsetLoading({
                option: 'default',
                message: 'successful'
            })
        }

        return response

    }, [setLoading]);

    return {
        users,
        user,
        userType,

        redirect,
        logAuthCredentials,
        
        login,
        register,
        logout,
        activateAccount,
        sendResetLink,
        resetPassword,
        forcePassword
    }
}

export default useAuth
