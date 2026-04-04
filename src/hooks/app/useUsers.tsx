import { useCallback } from "react";
import useContextType from "../useContextType";
import useNetwork from "../useNetwork";
import AxiosService from "../../services/axios.service";
import { createCollection, createQuery } from "../../utils/collection.util";
import { GET_CAMS_USER, GET_CAMS_USERS } from "../../context/types";
import { URL_CAMS_USERS } from "../../utils/path.util";
import { IListQuery } from "../../utils/interfaces.util";

const useUsers = () => {
    const { appContext } = useContextType();
    const { popNetwork } = useNetwork(false);

    const {
        camsUsers,
        camsUser,
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

    const getUsers = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            limit: data.limit ?? 20,
            page: data.page ?? 1
        });

        setLoading({ option: "resource", type: GET_CAMS_USERS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_USERS}/all?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_USERS, createCollection(response, "There are no users currently"));
            return response;
        }

        handleError(GET_CAMS_USERS, response, "Unable to fetch users");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getUser = useCallback(async (id: string) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_USERS}/${id}`
        });

        if (!response.error) {
            setResource(GET_CAMS_USER, response.data);
            unsetLoading({ option: "default", message: "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to fetch user" });
        return response;
    }, [setLoading, setResource, unsetLoading]);

    return {
        users: camsUsers,
        user: camsUser,
        loading,
        getUsers,
        getUser
    };
};

export default useUsers;
