import React, { useContext, useEffect, useState } from 'react'
import useContextType from './useContextType'
import storage from '../utils/storage.util'
import useGoTo from './useGoTo'
import routes from '../routes/sidebar.route'
import { IRoute } from '../utils/interfaces.util'
import { IWorkspaceFeature } from '../models/Workspace.model'

interface IUseSidebar {
    type?: 'sidebar' | 'page',
    init?: boolean
}

const useSidebar = ({ type = 'sidebar', init = false }: IUseSidebar) => {

    const { userContext } = useContextType()
    const { getRoute } = useGoTo()

    const {
        sidebar,
        currentSidebar,
        setSidebar
    } = userContext;

    useEffect(() => {

        if (init) {
            initSidebar()
        }

    }, [init])

    const resolveSidebarRoute = () => {

        const name = storage.fetch('route.name');
        const storedRoute = name ? getRoute(name) : null;

        if (storedRoute) {
            return storedRoute;
        }

        if (name) {
            storage.deleteItem('route.name');
            storage.deleteItem('route.subroute');
        }

        return routes[0];

    }

    const initSidebar = () => {

        if (type === 'page') {

            const result = currentSidebar(sidebar.collapsed);

            if (result) {
                setSidebar(result)
            }

        }

        if (type === 'sidebar') {
            closeSidebar()
        }


    }

    const closeSidebar = () => {
        setSidebar({
            collapsed: false,
            route: resolveSidebarRoute(),
            subroutes: [],
            inroutes: [],
            isOpen: false
        })

    }
    
    return {
        sidebar,

        currentSidebar,
        setSidebar,
        initSidebar,
        closeSidebar
    }
}

export default useSidebar
