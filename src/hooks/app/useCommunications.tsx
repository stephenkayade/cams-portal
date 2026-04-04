import { useCallback } from "react";
import AxiosService from "../../services/axios.service";
import { URL_CAMS_COMMUNICATIONS } from "../../utils/path.util";

interface ISendMailPayload {
    mailSubject: string;
    mailBody: string;
    participants: Array<string>;
}

interface ISendSmsPayload {
    smsBody: string;
    participants: Array<string>;
}

const useCommunications = () => {
    const sendMail = useCallback(async (payload: ISendMailPayload) => {
        return AxiosService.call({
            type: "default",
            method: "POST",
            isAuth: true,
            path: `${URL_CAMS_COMMUNICATIONS}/mail-via-id`,
            payload
        });
    }, []);

    const sendSms = useCallback(async (payload: ISendSmsPayload) => {
        return AxiosService.call({
            type: "default",
            method: "POST",
            isAuth: true,
            path: `${URL_CAMS_COMMUNICATIONS}/sms-via-id`,
            payload
        });
    }, []);

    return {
        sendMail,
        sendSms
    };
};

export default useCommunications;
