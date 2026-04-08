import { useCallback, useMemo, useReducer } from 'react'
import storage from '../../utils/storage.util'
import { ICollection, ISetLoading, ISidebarProps, IToast, IUnsetLoading } from '../../utils/interfaces.util';
import { collection, sidebar, toast } from '../../_data/seed';
import sidebarRoutes from '../../routes/sidebar.route';

import UserContext from './userContext';
import UserReducer from './userReducer';

import {
    SET_USERTYPE,
    SET_LOADING,
    SET_SIDEBAR,
    SET_TOAST,
    UNSET_LOADING,
    SET_LOADER,
    SET_WORKSPACE_LOADING
} from '../types'

const UserState = (props: any) => {

    const initialState = {
        users: collection,
        user: {},
        userType: '',
        loading: false,
        loader: false,
        toast: toast,
        sidebar: sidebar
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    /**
     * @name setLoading
     * @param data 
     */
    const setLoading = useCallback(async (data: ISetLoading) => {

        if (data.option === 'default') {
            dispatch({
                type: SET_LOADING
            })
        }

        if (data.option === 'loader') {
            dispatch({
                type: SET_LOADER,
                payload: true
            })
        }

        if (data.option === 'workspace') {
            dispatch({
                type: SET_WORKSPACE_LOADING,
                payload: true
            })
        }

        if (data.option === 'resource' && data.type) {

            const { loading, ...rest } = collection;

            dispatch({
                type: data.type,
                payload: {
                    ...rest,
                    loading: true
                }
            })

        }

    }, [])

    /**
     * @name unsetLoading
     * @param data 
     */
    const unsetLoading = useCallback(async (data: IUnsetLoading) => {

        if (data.option === 'default') {
            dispatch({
                type: UNSET_LOADING,
                payload: data.message
            })
        }

        if (data.option === 'loader') {
            dispatch({
                type: SET_LOADER,
                payload: false
            })
        }

        if (data.option === 'workspace') {
            dispatch({
                type: SET_WORKSPACE_LOADING,
                payload: false
            })
        }

        if (data.option === 'resource' && data.type) {

            const { loading, message, ...rest } = collection;

            dispatch({
                type: data.type,
                payload: {
                    ...rest,
                    loading: false,
                    message: data.message
                }
            })

        }

    }, [])

    /**
     * @name setUserType
     * @param type 
     */
    const setUserType = useCallback((type: string) => {

        dispatch({
            type: SET_USERTYPE,
            payload: type
        })

    }, [])

    const setSidebar = useCallback((data: ISidebarProps) => {
        dispatch({
            type: SET_SIDEBAR,
            payload: data
        })
    }, [])

    const currentSidebar = useCallback((collapse: boolean): ISidebarProps | null => {

        let result: ISidebarProps | null = null;

        const name = storage.fetch('route.name');
        const sub = storage.fetch('route.subroute');

        let route = sidebarRoutes.find((x) => x.name === name);

        if (!route) {
            storage.deleteItem('route.name');
            storage.deleteItem('route.subroute');
            route = sidebarRoutes[0];
        }

        if (route && route.subroutes && route.subroutes.length > 0) {

            const subroute = route.subroutes.find((m) => m.name === sub);

            if (subroute) {
                result = {
                    collapsed: collapse,
                    route: route,
                    subroutes: route.subroutes,
                    inroutes: route.inroutes ? route.inroutes : [],
                    isOpen: true
                }
            } else {
                result = {
                    collapsed: collapse,
                    route: route,
                    subroutes: route.subroutes,
                    inroutes: route.inroutes ? route.inroutes : [],
                    isOpen: true
                }
            }

        } else if (route) {
            result = {
                collapsed: collapse,
                route: route,
                subroutes: route.subroutes ? route.subroutes : [],
                inroutes: route.inroutes ? route.inroutes : [],
                isOpen: false
            }
        }

        return result;

    }, [])

    const setToast = useCallback((data: IToast) => {
        dispatch({
            type: SET_TOAST,
            payload: data
        })
    }, [])

    const clearToast = useCallback(() => {
        dispatch({
            type: SET_TOAST,
            payload: {
                type: 'success',
                show: false,
                message: '',
                title: 'Feedback',
                position: 'top-right',
            }
        })
    }, [])

    const setCollection = useCallback((type: string, data: ICollection) => {
        dispatch({
            type: type,
            payload: data
        })
    }, [])

    const setResource = useCallback((type: string, data: any) => {
        dispatch({
            type: type,
            payload: data
        })
    }, [])

    const contextValues = useMemo(() => ({
        users: state.users,
        user: state.user,
        userType: state.userType,
        loading: state.loading,
        loader: state.loader,
        toast: state.toast,
        sidebar: state.sidebar,
        setToast: setToast,
        clearToast: clearToast,
        setUserType: setUserType,
        setSidebar: setSidebar,
        currentSidebar: currentSidebar,
        setCollection: setCollection,
        setResource: setResource,
        setLoading: setLoading,
        unsetLoading: unsetLoading
    }), [
        state.users,
        state.user,
        state.userType,
        state.loading,
        state.toast,
        state.sidebar,
        setToast,
        clearToast,
        setUserType,
        setSidebar,
        currentSidebar,
        setCollection,
        setResource,
        setLoading,
        unsetLoading
    ])

    return <UserContext.Provider
        value={contextValues}
    >
        {props.children}

    </UserContext.Provider>

}

export default UserState
