import { useCallback } from "react";
import useContextType from "../useContextType";
import useNetwork from "../useNetwork";
import AxiosService from "../../services/axios.service";
import { createCollection, createQuery } from "../../utils/collection.util";
import {
    GET_CAMS_CENTERS,
    GET_CAMS_EVENT,
    GET_CAMS_EVENTS,
    GET_CAMS_EVENT_STATS,
    SET_CAMS_SELECTED_EVENT
} from "../../context/types";
import { URL_CAMS_CENTERS, URL_CAMS_EVENTS, URL_CAMS_PARTICIPANTS } from "../../utils/path.util";
import { IListQuery } from "../../utils/interfaces.util";
import storage from "../../utils/storage.util";

const useEvents = () => {
    const { appContext } = useContextType();
    const { popNetwork } = useNetwork(false);

    const {
        camsEvents,
        camsEvent,
        camsCenters,
        camsEventStats,
        camsSelectedEvent,
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

    const setSelectedEvent = useCallback((event: Record<string, any>) => {
        storage.keep("cams.selectedEvent", event);
        setResource(SET_CAMS_SELECTED_EVENT, event);
    }, [setResource]);

    const getEvents = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            limit: data.limit ?? 12,
            page: data.page ?? 1,
            order: data.order ?? "desc",
            _keyword: data.key
        });

        setLoading({ option: "resource", type: GET_CAMS_EVENTS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_EVENTS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_EVENTS, createCollection(response, "There are no events currently"));
            return response;
        }

        handleError(GET_CAMS_EVENTS, response, "Unable to fetch events");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getEvent = useCallback(async (id: string) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_EVENTS}/${id}`
        });

        if (!response.error) {
            setResource(GET_CAMS_EVENT, response.data);
            unsetLoading({ option: "default", message: "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to fetch event" });
        return response;
    }, [setLoading, setResource, unsetLoading]);

    const updateEvent = useCallback(async (id: string, payload: Record<string, any>) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "PATCH",
            isAuth: true,
            path: `${URL_CAMS_EVENTS}/${id}`,
            payload
        });

        if (!response.error) {
            const updatedEvent = response.data;

            setResource(GET_CAMS_EVENT, updatedEvent);

            if (camsEvents?.data?.length) {
                setCollection(GET_CAMS_EVENTS, {
                    ...camsEvents,
                    data: camsEvents.data.map((item: Record<string, any>) => item._id === id ? updatedEvent : item)
                });
            }

            if (camsSelectedEvent?._id === id) {
                storage.keep("cams.selectedEvent", updatedEvent);
                setResource(SET_CAMS_SELECTED_EVENT, updatedEvent);
            }

            unsetLoading({ option: "default", message: response.message || "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to update event" });
        return response;
    }, [camsEvents, camsSelectedEvent?._id, setCollection, setLoading, setResource, unsetLoading]);

    const createEvent = useCallback(async (payload: Record<string, any>) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "POST",
            isAuth: true,
            path: `${URL_CAMS_EVENTS}`,
            payload
        });

        if (!response.error) {
            const createdEvent = response.data;

            if (camsEvents?.data?.length) {
                setCollection(GET_CAMS_EVENTS, {
                    ...camsEvents,
                    count: (camsEvents.count || camsEvents.data.length) + 1,
                    total: (camsEvents.total || camsEvents.data.length) + 1,
                    data: [createdEvent, ...camsEvents.data]
                });
            }

            unsetLoading({ option: "default", message: response.message || "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to create event" });
        return response;
    }, [camsEvents, setCollection, setLoading, unsetLoading]);

    const getEventStats = useCallback(async (id: string) => {
        setLoading({ option: "resource", type: GET_CAMS_EVENT_STATS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_PARTICIPANTS}/stats/${id}`
        });

        if (!response.error) {
            setResource(GET_CAMS_EVENT_STATS, response.data);
            return response;
        }

        handleError(GET_CAMS_EVENT_STATS, response, "Unable to fetch event stats");
        return response;
    }, [handleError, setLoading, setResource]);

    const getCenters = useCallback(async () => {
        const query = createQuery({
            limit: 1000000,
            orderBy: "title",
            order: "asc"
        });

        setLoading({ option: "resource", type: GET_CAMS_CENTERS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_CENTERS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_CENTERS, createCollection(response, "There are no centers currently"));
            return response;
        }

        handleError(GET_CAMS_CENTERS, response, "Unable to fetch centers");
        return response;
    }, [handleError, setCollection, setLoading]);

    return {
        events: camsEvents,
        event: camsEvent,
        centers: camsCenters,
        stats: camsEventStats,
        selectedEvent: camsSelectedEvent,
        loading,
        getEvents,
        getEvent,
        createEvent,
        updateEvent,
        getEventStats,
        getCenters,
        setSelectedEvent
    };
};

export default useEvents;
