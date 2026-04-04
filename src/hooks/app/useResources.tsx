import { useCallback, useState } from "react";
import useContextType from "../useContextType";
import useNetwork from "../useNetwork";
import AxiosService from "../../services/axios.service";
import { createCollection, createQuery } from "../../utils/collection.util";
import {
    GET_CAMS_RESOURCE_GROUPS,
    GET_CAMS_RESOURCE_GROUP_TYPES,
    GET_CAMS_RESOURCE_TYPE_GROUPS,
    GET_CAMS_SERVICE_POINTS
} from "../../context/types";
import {
    URL_CAMS_RESOURCE_GROUPS,
    URL_CAMS_RESOURCE_GROUP_TYPES,
    URL_CAMS_SERVICE_POINTS
} from "../../utils/path.util";
import { IListQuery } from "../../utils/interfaces.util";

const useResources = () => {
    const { appContext } = useContextType();
    const { popNetwork } = useNetwork(false);
    const [possibleTypes, setPossibleTypes] = useState<Array<any>>([]);
    const [possibleCategoryValues, setPossibleCategoryValues] = useState<Record<string, Array<any>>>({});

    const {
        camsResourceGroups,
        camsResourceGroupTypes,
        camsResourceTypeGroups,
        camsServicePoints,
        loading,
        setCollection,
        setLoading,
        unsetLoading
    } = appContext;

    const handleError = useCallback((type: string, response: any, fallback: string) => {
        unsetLoading({
            option: "resource",
            type,
            message: response?.message || fallback
        });

        if (response?.message === "Error: Network Error") {
            popNetwork();
        }
    }, [popNetwork, unsetLoading]);

    const mapPossibleValues = (data: Array<any>) => {
        return data.reduce<Record<string, Array<any>>>((acc, item) => {
            if (item?.title && !acc[item.title]) {
                acc[item.title] = item.values || [];
            }
            return acc;
        }, {});
    };

    const getResourceGroupTypes = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            event: data.payload?.event,
            limit: data.limit ?? 20,
            page: data.page ?? 1,
            _populate: "createdBy"
        });

        setLoading({ option: "resource", type: GET_CAMS_RESOURCE_GROUP_TYPES });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_RESOURCE_GROUP_TYPES}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_RESOURCE_GROUP_TYPES, createCollection(response, "There are no resource types currently"));
            return response;
        }

        handleError(GET_CAMS_RESOURCE_GROUP_TYPES, response, "Unable to fetch resource group types");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getEventResourceGroups = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            event: data.payload?.event,
            limit: data.limit ?? 20,
            page: data.page ?? 1,
            _populate: ["type", "event"],
            _order: "asc",
            _orderBy: "title"
        });

        setLoading({ option: "resource", type: GET_CAMS_RESOURCE_GROUPS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_RESOURCE_GROUPS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_RESOURCE_GROUPS, createCollection(response, "There are no resource groups currently"));
            return response;
        }

        handleError(GET_CAMS_RESOURCE_GROUPS, response, "Unable to fetch resource groups");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getResourceTypeGroups = useCallback(async (typeId: string) => {
        const query = createQuery({
            type: typeId,
            _order: "asc",
            _orderBy: "title"
        });

        setLoading({ option: "resource", type: GET_CAMS_RESOURCE_TYPE_GROUPS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_RESOURCE_GROUPS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_RESOURCE_TYPE_GROUPS, createCollection(response, "There are no resource type groups currently"));
            return response;
        }

        handleError(GET_CAMS_RESOURCE_TYPE_GROUPS, response, "Unable to fetch resource type groups");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getPossibleTypes = useCallback(async (accommodation = false) => {
        const path = accommodation ? `${URL_CAMS_RESOURCE_GROUPS}/accomodation-possible-categories` : `${URL_CAMS_RESOURCE_GROUPS}/possible-categories`;

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path
        });

        if (!response.error) {
            const data = response.data || [];
            setPossibleTypes(data);
            setPossibleCategoryValues(mapPossibleValues(data));
            return response;
        }

        if (response.status === 401) {
            AxiosService.logout();
        }
        return response;
    }, []);

    const getServicePoints = useCallback(async (eventId: string) => {
        const query = createQuery({ event: eventId });

        setLoading({ option: "resource", type: GET_CAMS_SERVICE_POINTS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_SERVICE_POINTS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_SERVICE_POINTS, createCollection(response, "There are no service points currently"));
            return response;
        }

        handleError(GET_CAMS_SERVICE_POINTS, response, "Unable to fetch service points");
        return response;
    }, [handleError, setCollection, setLoading]);

    return {
        resourceGroups: camsResourceGroups,
        resourceGroupTypes: camsResourceGroupTypes,
        resourceTypeGroups: camsResourceTypeGroups,
        servicePoints: camsServicePoints,
        possibleTypes,
        possibleCategoryValues,
        loading,
        getResourceGroupTypes,
        getEventResourceGroups,
        getResourceTypeGroups,
        getPossibleTypes,
        getServicePoints
    };
};

export default useResources;
