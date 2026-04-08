import { useCallback, useEffect } from 'react'
import useContextType from '../useContextType'
import storage from '../../utils/storage.util'
import AxiosService from '../../services/axios.service'
import { URL_CHANGE_PASSWORD, URL_SEND_CODE, URL_USERS } from '../../utils/path.util'
import { GET_LOGGEDIN_USER, } from '../../context/types'
import useNetwork from '../useNetwork'
import useAuth from './useAuth'

interface IChangePassword {
    currentPassword: string,
    newPassword: string,
    code: string
}

const useUser = () => {

    const { userContext } = useContextType()
    const { popNetwork } = useNetwork(false)
    const { logout } = useAuth()
    const {
        users,
        user,
        loading,
        setLoading,
        unsetLoading,
        setResource
    } = userContext

    useEffect(() => {

    }, [])

    const displayAmount = (amount: { base: number, features: number }) => {
        let result = amount.base + amount.features;
        return result.toLocaleString()
    }

    /**
     * @name getFullname
     * @param data 
     * @returns 
     */
    const getFullname = (data: any) => {
        let result: string = '--'

        if (data && "firstName" in data && "lastName" in data) {
            result = `${data.firstName} ${data.lastName}`
        }

        return result;
    }

    /**
     * @name getUser
     */
    const getUser = useCallback(async (id?: string) => {

        const userId = id ? id : storage.getUserID();

        setLoading({ option: 'default' });

        const response = await AxiosService.call({
            type: 'backend',
            method: 'GET',
            isAuth: true,
            path: `${URL_USERS}/${userId}`
        });

        if (!response.error) {
            setResource(GET_LOGGEDIN_USER, response.data)
            unsetLoading({ option: 'default', message: 'data fetched successfully' })
        } else {
            setResource(GET_LOGGEDIN_USER, {})
            unsetLoading({ option: 'default', message: response.message })

            if (response.status === 401) {
                logout()
            } else if (response.message && response.message === 'Error: Network Error') {
                popNetwork();
            } else if (response.data) {
                console.log(`Error! Could not get topics ${response.data}`)
            }
        }

    }, [setLoading, unsetLoading, setResource])

    /**
     * @name sendVerificationCode
     */
    const sendVerificationCode = useCallback(async () => {

        const userId = storage.getUserID();

        setLoading({ option: 'default' });

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            isAuth: true,
            path: `${URL_SEND_CODE}/${userId}`,
            payload: {}
        });

        if (!response.error) {
            unsetLoading({ option: 'default', message: 'data fetched successfully' })
        } else {
            unsetLoading({ option: 'default', message: response.message })

            if (response.status === 401) {
                logout()
            } else if (response.message && response.message === 'Error: Network Error') {
                popNetwork();
            } else if (response.data) {
                console.log(`Error! Could not send verification code ${response.data}`)
            }
        }

        return response;

    }, [setLoading, unsetLoading])

    /**
     * @name changePassword
     */
    const changePassword = useCallback(async (data: IChangePassword) => {

        const userId = storage.getUserID();

        setLoading({ option: 'default' });

        const response = await AxiosService.call({
            type: 'backend',
            method: 'PUT',
            isAuth: true,
            path: `${URL_CHANGE_PASSWORD}/${userId}`,
            payload: { ...data }
        });

        if (!response.error) {
            unsetLoading({ option: 'default', message: 'data fetched successfully' })
        } else {
            unsetLoading({ option: 'default', message: response.message })

            if (response.status === 401) {
                logout()
            } else if (response.message && response.message === 'Error: Network Error') {
                popNetwork();
            } else if (response.data) {
                console.log(`Error! Could not send verification code ${response.data}`)
            }
        }

        return response;

    }, [setLoading, unsetLoading])


    return {
        users,
        user,
        loading,
        getFullname,
        displayAmount,

        sendVerificationCode,
        changePassword,
        getUser,
    }
}

export default useUser
