import { useCallback } from "react";
import useContextType from "../useContextType";
import useNetwork from "../useNetwork";
import AxiosService from "../../services/axios.service";
import { createCollection, createQuery } from "../../utils/collection.util";
import {
    GET_CAMS_ACCOMMODATION,
    GET_CAMS_ACCOMMODATIONS,
    GET_CAMS_ROOM,
    GET_CAMS_ROOMS
} from "../../context/types";
import { URL_CAMS_ACCOMMODATIONS, URL_CAMS_ROOMS } from "../../utils/path.util";
import { IListQuery } from "../../utils/interfaces.util";

const useAccommodations = () => {
    const { appContext } = useContextType();
    const { popNetwork } = useNetwork(false);

    const {
        camsAccommodations,
        camsAccommodation,
        camsRooms,
        camsRoom,
        loading,
        setCollection,
        setResource,
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

    const getAccommodations = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            event: data.payload?.event,
            _limit: data.limit ?? 20,
            _page: data.page ?? 1,
            _order: "asc",
            _orderBy: "title"
        });

        setLoading({ option: "resource", type: GET_CAMS_ACCOMMODATIONS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_ACCOMMODATIONS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_ACCOMMODATIONS, createCollection(response, "There are no accommodations currently"));
            return response;
        }

        handleError(GET_CAMS_ACCOMMODATIONS, response, "Unable to fetch accommodations");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getAccommodation = useCallback(async (id: string) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_ACCOMMODATIONS}/${id}`
        });

        if (!response.error) {
            setResource(GET_CAMS_ACCOMMODATION, response.data);
            unsetLoading({ option: "default", message: "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to fetch accommodation" });
        return response;
    }, [setLoading, setResource, unsetLoading]);

    const getRooms = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            limit: data.limit ?? 20,
            page: data.page ?? 1,
            _order: "asc",
            _orderBy: "title"
        });

        setLoading({ option: "resource", type: GET_CAMS_ROOMS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_ROOMS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_ROOMS, createCollection(response, "There are no rooms currently"));
            return response;
        }

        handleError(GET_CAMS_ROOMS, response, "Unable to fetch rooms");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getRoomsByAccommodation = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            accomodation: data.payload?.accommodationId,
            _limit: data.limit ?? 60,
            _page: data.page ?? 1,
            _order: "asc",
            _orderBy: "title"
        });

        setLoading({ option: "resource", type: GET_CAMS_ROOMS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_ROOMS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_ROOMS, createCollection(response, "There are no rooms currently"));
            return response;
        }

        handleError(GET_CAMS_ROOMS, response, "Unable to fetch rooms");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getRoom = useCallback(async (id: string) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_ROOMS}/${id}`
        });

        if (!response.error) {
            setResource(GET_CAMS_ROOM, response.data);
            unsetLoading({ option: "default", message: "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to fetch room" });
        return response;
    }, [setLoading, setResource, unsetLoading]);

    return {
        accommodations: camsAccommodations,
        accommodation: camsAccommodation,
        rooms: camsRooms,
        room: camsRoom,
        loading,
        getAccommodations,
        getAccommodation,
        getRooms,
        getRoomsByAccommodation,
        getRoom
    };
};

export default useAccommodations;
