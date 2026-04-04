import React, { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "../../../../../components/partials/modals/Modal";
import Button from "../../../../../components/partials/buttons/Button";
import Divider from "../../../../../components/partials/Divider";
import useToast from "../../../../../hooks/useToast";
import storage from "../../../../../utils/storage.util";

interface IEventExportModal {
    show: boolean;
    event?: Record<string, any> | null;
    onClose(): void;
}

const EventExportModal = ({ show, event, onClose }: IEventExportModal) => {
    const { setToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [range, setRange] = useState({ startDate: "", endDate: "" });

    useEffect(() => {
        if (!show) {
            return;
        }

        setRange({
            startDate: event?.start_date ? String(event.start_date).slice(0, 10) : "",
            endDate: event?.end_date ? String(event.end_date).slice(0, 10) : ""
        });
    }, [event?.end_date, event?.start_date, show]);

    const pushToast = (type: "success" | "error", message: string) => {
        setToast({
            show: true,
            type,
            title: type === "success" ? "Success" : "Error",
            message,
            position: "top-right"
        });
    };

    const handleExport = async () => {
        if (!event?._id) {
            return;
        }

        if (!range.startDate || !range.endDate) {
            pushToast("error", "Start date and end date are required");
            return;
        }

        setLoading(true);

        try {
            const response = await Axios({
                url: `${import.meta.env.VITE_APP_API_URL}/events/report`,
                method: "POST",
                data: {
                    event: event._id,
                    startDate: range.startDate,
                    endDate: range.endDate
                },
                responseType: "blob",
                headers: storage.getConfigWithBearer().headers
            });

            const blob = new Blob([response.data], { type: response.headers["content-type"] || "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${(event.title || "event").replace(/\s+/g, "-").toLowerCase()}-${range.startDate}-${range.endDate}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            pushToast("success", "Report downloaded successfully");
            onClose();
        } catch (error: any) {
            pushToast("error", error?.response?.data?.message || "Unable to export report");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            title="Export event data"
            size="lg"
            header={false}
            flattened={true}
            hideOnClose={true}
            closeModal={onClose}
        >
            <div className="space-y-[1rem]">
                <div className="space-y-[0.2rem]">
                    <h2 className="font-uncut-semibold text-[22px] pag-950">Export event data</h2>
                    <p className="font-mona-light text-[14px] pag-500">Download participant report data for the selected event.</p>
                </div>

                <Divider />

                <div className="grid gap-[0.9rem] md:grid-cols-2">
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Export from</span>
                        <input type="date" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={range.startDate} onChange={(e) => setRange((prev) => ({ ...prev, startDate: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Export to</span>
                        <input type="date" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={range.endDate} onChange={(e) => setRange((prev) => ({ ...prev, endDate: e.target.value }))} />
                    </label>
                </div>

                <div className="flex items-center justify-end gap-[0.6rem]">
                    <Button type="ghost" semantic="default" size="xxsm" text={{ label: "Cancel", size: 12 }} onClick={(e) => { e.preventDefault(); onClose(); }} />
                    <Button loading={loading} type="primary" semantic="blue" size="xxsm" text={{ label: "Download CSV", size: 12 }} onClick={(e) => { e.preventDefault(); handleExport(); }} />
                </div>
            </div>
        </Modal>
    );
};

export default EventExportModal;
