import { useCallback } from "react";
import useContextType from "../useContextType";
import useNetwork from "../useNetwork";
import AxiosService from "../../services/axios.service";
import { createCollection, createQuery } from "../../utils/collection.util";
import { GET_CAMS_REPORT, GET_CAMS_REPORTS } from "../../context/types";
import { URL_CAMS_REPORTS } from "../../utils/path.util";
import { IListQuery } from "../../utils/interfaces.util";

const useReports = () => {
    const { appContext } = useContextType();
    const { popNetwork } = useNetwork(false);

    const {
        camsReports,
        camsReport,
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

    const getReports = useCallback(async (data: IListQuery = {}) => {
        const query = createQuery({
            limit: data.limit ?? 20,
            page: data.page ?? 1,
            _populate: "center"
        });

        setLoading({ option: "resource", type: GET_CAMS_REPORTS });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_REPORTS}?${query}`
        });

        if (!response.error) {
            setCollection(GET_CAMS_REPORTS, createCollection(response, "There are no center reports currently"));
            return response;
        }

        handleError(GET_CAMS_REPORTS, response, "Unable to fetch center reports");
        return response;
    }, [handleError, setCollection, setLoading]);

    const getReport = useCallback(async (id: string) => {
        setLoading({ option: "default" });

        const response = await AxiosService.call({
            type: "default",
            method: "GET",
            isAuth: true,
            path: `${URL_CAMS_REPORTS}/${id}?_populate=center`
        });

        if (!response.error) {
            setResource(GET_CAMS_REPORT, response.data);
            unsetLoading({ option: "default", message: "successful" });
            return response;
        }

        unsetLoading({ option: "default", message: response.message || "Unable to fetch report" });
        return response;
    }, [setLoading, setResource, unsetLoading]);

    return {
        reports: camsReports,
        report: camsReport,
        loading,
        getReports,
        getReport
    };
};

export default useReports;
