import React, { useCallback, useContext, useEffect, useState } from 'react'
import useContextType from '../useContextType'
import storage from '../../utils/storage.util'
import AxiosService from '../../services/axios.service'
import { URL_CHANGE_PASSWORD, URL_LOGIN, URL_METRICS, URL_SEND_CODE, URL_TALENT, URL_USERS } from '../../utils/path.util'
import { GET_GROWTH_METRICS, GET_LOGGEDIN_USER, GET_PLAN, GET_SUBSCRIPTION, GET_TALENT, GET_USER, GET_USERS, SET_MAIN_CAREER } from '../../context/types'
import { ICollection, IListQuery } from '../../utils/interfaces.util'
import useNetwork from '../useNetwork'
import useAuth from './useAuth'
import { levels } from '../../_data/seed'
import { IChartData, ITalentCareer, ITalentGrowth } from '../../models/Talent.model'

interface IOnboardTalent {
    firstName?: string,
    lastName?: string,
    careerId?: string,
    fields?: Array<string>,
    level?: string,
    skills?: Array<string>,
    username?: string,
    avatar?: string
}

interface IUpdateTalent {
    firstName: string,
    lastName: string,
    middleName: string,
    phoneCode: string,
    phoneNumber: string,
    countryCode: string,
    username: string,
    gender: string,
    avatar: string
}

interface IChangePassword {
    currentPassword: string,
    newPassword: string,
    code: string
}

interface IGetGrowth {
    id?: string,
    careerId: string,
    level?: string,
    workspace?: string
}

interface IAcceptInvite {
    type: 'business' | 'invite',
    token: string
}

const useUser = () => {

    const { userContext } = useContextType()
    const { popNetwork } = useNetwork(false)
    const { logout } = useAuth()
    const {
        users,
        user,
        talent,
        mainCareer,
        subscription,
        plan,
        growth,
        loading,
        setLoading,
        unsetLoading,
        setCollection,
        setResource
    } = userContext

    useEffect(() => {

    }, [])

    const displayAmount = (amount: { base: number, features: number }) => {
        let result = amount.base + amount.features;
        return result.toLocaleString()
    }

    const featureExists = (name: string) => {
        let result: boolean = false;

        if (subscription && subscription?.features?.length > 0) {
            const featureNames = subscription.features.map((ft) => ft.name);
            if (featureNames.includes(name)) {
                result = true;
            }
        }

        return result;
    }

    const setMainCareer = (career: ITalentCareer) => {
        setResource(SET_MAIN_CAREER, career)
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
     * @name groupLevels
     * @param level 
     * @returns 
     */
    const groupLevels = (level: string) => {

        let result: Array<typeof levels[0]> = []
        const index = levels.findIndex((x) => x.value === level)

        if (index >= 0) {
            result = levels.slice(0, index + 1)
        }

        return result;

    }

    const chartValuesSame = (data: Array<IChartData>) => {

        let newData: Array<IChartData> = [];

        const isSame = data.every((item) => item.value === data[0].value);
        if (isSame) {

            data.forEach((item, index) => {
                if (index !== data.length - 1) {
                    item.value = 0; // set all except last to 0
                }
                newData.push(item)
            });
        } else {
            newData = data;
        }

        return newData;
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
     * @name getTalent
     */
    const getTalent = useCallback(async (id?: string) => {

        const userId = id ? id : storage.getUserID();

        setLoading({ option: 'default' });

        const response = await AxiosService.call({
            type: 'backend',
            method: 'GET',
            isAuth: true,
            path: `${URL_TALENT}/${userId}`
        });

        if (!response.error) {

            setResource(GET_TALENT, response.data); // set talent data

            if (response.data.subscription) {

                setResource(GET_SUBSCRIPTION, response.data.subscription);

                if (response.data.subscription.plan) {
                    setResource(GET_PLAN, response.data.subscription.plan);
                }

            }

            unsetLoading({ option: 'default', message: 'data fetched successfully' })
        } else {
            setResource(GET_TALENT, {})
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

    const getGrowth = useCallback(async (data: IGetGrowth) => {

        const userId = data.id ? data.id : storage.getUserID();

        let payload: any = {
            careerId: data.careerId,
            level: data.level ? data.level : ''
        }

        if(data.workspace){
            payload.workspaceId = data.workspace
        }

        setLoading({ option: 'default' });

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            isAuth: true,
            path: `${URL_TALENT}/growth/${userId}`,
            payload: payload
        });

        if (!response.error) {

            setResource(GET_GROWTH_METRICS, response.data); // set talent data
            unsetLoading({ option: 'default', message: 'data fetched successfully' })

        } else {
            unsetLoading({ option: 'default', message: response.message })

            if (response.status === 401) {
                logout()
            } else if (response.message && response.message === 'Error: Network Error') {
                popNetwork();
            } else if (response.data) {
                console.log(`Error! Could not get talent growth ${response.data}`)
            }
        }

    }, [setLoading, unsetLoading, setResource])

    /**
     * @name onboardTalent
     */
    const onboardTalent = useCallback(async (data: IOnboardTalent) => {

        const userId = storage.getUserID();

        setLoading({ option: 'default' });

        const response = await AxiosService.call({
            type: 'backend',
            method: 'POST',
            isAuth: true,
            path: `${URL_TALENT}/onboard/${userId}`,
            payload: { ...data }
        });

        if (!response.error) {
            unsetLoading({ option: 'default', message: 'data fetched successfully' })
        } else {
            unsetLoading({ option: 'default', message: response.message })
        }

        return response;

    }, [setLoading, unsetLoading, setResource])

    /**
     * @name updateTalent
     */
    const updateTalent = useCallback(async (data: IUpdateTalent) => {

        const userId = storage.getUserID();

        setLoading({ option: 'default' });

        const response = await AxiosService.call({
            type: 'backend',
            method: 'PUT',
            isAuth: true,
            path: `${URL_TALENT}/${userId}`,
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
                console.log(`Error! Could not get topics ${response.data}`)
            }
        }

        return response;

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


    const acceptInvite = useCallback(async (data: IAcceptInvite) => {

        setLoading({ option: 'default' })

        const response = await AxiosService.call({
            type: 'backend',
            method: 'PUT',
            path: data.type === 'invite' ? `${URL_USERS}/accept-invite` : `${URL_TALENT}/accept`,
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
                message: 'an error occured'
            })
        }

        return response

    }, [setLoading])

    return {
        users,
        user,
        talent,
        mainCareer,
        subscription,
        plan,
        growth,
        loading,

        groupLevels,
        getFullname,
        setMainCareer,
        displayAmount,
        featureExists,
        chartValuesSame,

        sendVerificationCode,
        changePassword,
        getUser,
        getTalent,
        onboardTalent,
        updateTalent,
        getGrowth,
        acceptInvite
    }
}

export default useUser
