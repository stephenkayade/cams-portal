import { useCallback } from "react";
import useContextType from "../useContextType";
import useNetwork from "../useNetwork";
import AxiosService from "../../services/axios.service";
import { createCollection, createQuery } from "../../utils/collection.util";
import {
    GET_CAMS_COUNTRIES,
    GET_CAMS_PARTICIPANT,
    GET_CAMS_PARTICIPANTS
} from "../../context/types";
import { URL_CAMS_PARTICIPANTS } from "../../utils/path.util";
import { IListQuery } from "../../utils/interfaces.util";

const useParticipants = () => {
    const { appContext } = useContextType();
    const { popNetwork } = useNetwork(false);

    const {
        camsParticipants,
        camsParticipant,
        camsCountries,
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

    const getParticipants = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            event: data.payload?.event,
            _limit: data.limit ?? 30,
            _page: data.page ?? 1,
            _orderBy: "lastName",
            _order: "asc",
            _keyword: data.key,
            attendanceMode: data.payload?.attendanceMode,
            ageGroup: data.payload?.ageGroup,
            gender: data.payload?.gender,
            occupationGroup: data.payload?.occupationGroup,
            maritalStatus: data.payload?.maritalStatus,
            country: data.payload?.country,
            state: data.payload?.state,
            checkedIn: data.payload?.checkedIn,
            _populate: [
                "resourceGroups",
                "room",
                "servicePoint",
                "accomodation",
                "event",
                "center"
            ]
        });

        setLoading({ option: "resource", type: GET_CAMS_PARTICIPANTS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_PARTICIPANTS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_PARTICIPANTS, createCollection(response, "There are no participants currently"));
            return response;
        }

        handleError(GET_CAMS_PARTICIPANTS, response, "Unable to fetch participants");
        return response;
    }, [handleError, setCollection, setLoading]);

    const filterParticipants = useCallback(async (data: IListQuery = {}) => {
        const payload = data.payload || {};
        return getParticipants({
            ...data,
            payload: {
                event: payload.event,
                attendanceMode: payload.attendanceMode,
                ageGroup: payload.ageGroup,
                gender: payload.gender,
                occupationGroup: payload.occupationGroup,
                maritalStatus: payload.maritalStatus,
                country: payload.country,
                state: payload.state,
                checkedIn: payload.checkedIn
            }
        });
    }, [getParticipants]);

    const getParticipant = useCallback(async (id: string) => {
        setLoading({ option: "default" });

        const query = createQuery({
            _populate: ["event", "resourceGroups", "room", "servicePoint", "accomodation", "center"],
            _orderBy: "lastName",
            _order: "asc"
        });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_PARTICIPANTS}/${id}?${query}`
        });

        if (!response.error) {
            setResource(GET_CAMS_PARTICIPANT, response.data);
            unsetLoading({ option: "default", message: "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to fetch participant" });
        return response;
    }, [setLoading, setResource, unsetLoading]);

    const getCountries = useCallback(async () => {
        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_PARTICIPANTS}/countries?_order=asc`
        });

        if (!response.error) {
            setResource(GET_CAMS_COUNTRIES, response.data || []);
            return response;
        }

        if (response.status === 401) {
            AxiosService.logout();
        }
        return response;
    }, [setResource]);

    return {
        participants: camsParticipants,
        participant: camsParticipant,
        countries: camsCountries,
        loading,
        getParticipants,
        filterParticipants,
        getParticipant,
        getCountries
    };
};

export default useParticipants;
