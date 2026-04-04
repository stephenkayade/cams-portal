import { useCallback } from "react";
import useContextType from "../useContextType";
import useNetwork from "../useNetwork";
import AxiosService from "../../services/axios.service";
import { createCollection, createQuery } from "../../utils/collection.util";
import { GET_CAMS_SESSION, GET_CAMS_SESSIONS } from "../../context/types";
import { URL_CAMS_SESSIONS } from "../../utils/path.util";
import { IListQuery } from "../../utils/interfaces.util";

const useSessions = () => {
    const { appContext } = useContextType();
    const { popNetwork } = useNetwork(false);

    const {
        camsSessions,
        camsSession,
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

    const getSessions = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            status: data.payload?.status || "active",
            limit: data.limit ?? 20,
            page: data.page ?? 1,
            _populate: "event.center"
        });

        setLoading({ option: "resource", type: GET_CAMS_SESSIONS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_SESSIONS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_SESSIONS, createCollection(response, "There are no sessions currently"));
            return response;
        }

        handleError(GET_CAMS_SESSIONS, response, "Unable to fetch sessions");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getSession = useCallback(async (id: string) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_SESSIONS}/${id}?${createQuery({ _populate: "event.center" })}`
        });

        if (!response.error) {
            setResource(GET_CAMS_SESSION, response.data);
            unsetLoading({ option: "default", message: "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to fetch session" });
        return response;
    }, [setLoading, setResource, unsetLoading]);

    return {
        sessions: camsSessions,
        session: camsSession,
        loading,
        getSessions,
        getSession
    };
};

export default useSessions;
