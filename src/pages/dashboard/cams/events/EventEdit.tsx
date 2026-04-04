import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import Divider from "../../../../components/partials/Divider";
import Button from "../../../../components/partials/buttons/Button";
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import useEvents from "../../../../hooks/app/useEvents";
import useSidebar from "../../../../hooks/useSidebar";
import useToast from "../../../../hooks/useToast";
import helper from "../../../../utils/helper.util";
import routil from "../../../../utils/routes.util";
import storage from "../../../../utils/storage.util";

const EventEditPage = () => {
    useSidebar({ type: "page", init: true });

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { event, loading, getEvent, updateEvent, selectedEvent, setSelectedEvent } = useEvents();
    const { setToast } = useToast();
    const [saving, setSaving] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [form, setForm] = useState({
        title: "",
        category: "",
        venue: "",
        venue_address: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        cost: "",
        description: ""
    });

    useEffect(() => {
        storage.keep("route.name", "events");
    }, []);

    useEffect(() => {
        if (id) {
            getEvent(id);
        }
    }, [getEvent, id]);

    useEffect(() => {
        if (!id || helper.isEmpty(event, "object") || hydrated) {
            return;
        }

        setForm({
            title: event.title || "",
            category: event.category || "",
            venue: event.venue || event.location || "",
            venue_address: event.venue_address || "",
            start_date: event.start_date ? String(event.start_date).slice(0, 10) : "",
            start_time: event.start_time || "",
            end_date: event.end_date ? String(event.end_date).slice(0, 10) : "",
            end_time: event.end_time || "",
            cost: event.cost !== undefined && event.cost !== null ? String(event.cost) : "",
            description: event.description || ""
        });
        setHydrated(true);
    }, [event, hydrated, id]);

    const pushToast = (type: "success" | "error", message: string) => {
        setToast({
            show: true,
            type,
            title: type === "success" ? "Success" : "Error",
            message,
            position: "top-right"
        });
    };

    const handleSave = async () => {
        if (!id) {
            return;
        }

        if (!form.title.trim()) {
            pushToast("error", "Event title is required");
            return;
        }

        setSaving(true);
        const response = await updateEvent(id, {
            title: form.title.trim(),
            category: form.category.trim(),
            venue: form.venue.trim(),
            venue_address: form.venue_address.trim(),
            start_date: form.start_date || undefined,
            start_time: form.start_time || undefined,
            end_date: form.end_date || undefined,
            end_time: form.end_time || undefined,
            cost: form.cost ? Number(form.cost) : 0,
            description: form.description.trim()
        });
        setSaving(false);

        if (!response.error) {
            if (selectedEvent?._id === response.data?._id) {
                setSelectedEvent(response.data);
            }
            pushToast("success", response.message || "Event updated successfully");
            navigate(
                routil.inRoute({
                    route: "events",
                    name: "event-details",
                    params: id ? [{ type: "url", name: "id", value: id }] : []
                })
            );
            return;
        }

        pushToast("error", response.message || "Unable to update event");
    };

    return (
        <section className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Edit event", font: "uncut", weight: "semibold" }}
                description="Update core event details from the CAMS portal."
            >
                <div className="flex items-center gap-[0.6rem]">
                    <Button
                        type="ghost"
                        semantic="default"
                        size="xxsm"
                        text={{ label: "Cancel", size: 12 }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(
                                id
                                    ? routil.inRoute({
                                        route: "events",
                                        name: "event-details",
                                        params: [{ type: "url", name: "id", value: id }]
                                    })
                                    : routil.computePath("/events")
                            );
                        }}
                    />
                    <Button
                        loading={saving}
                        type="primary"
                        semantic="blue"
                        size="xxsm"
                        text={{ label: "Save changes", size: 12 }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                    />
                </div>
            </PageHeader>

            {loading && !hydrated && (
                <EmptyState className="min-h-[45vh]" noBound={true}>
                    <span className="loader lg primary"></span>
                    <span className="font-mona text-[16px] pas-950">Fetching event data</span>
                </EmptyState>
            )}

            {!loading && helper.isEmpty(event, "object") && (
                <EmptyState className="min-h-[45vh]" noBound={true}>
                    <span className="font-mona text-[14px] pas-950">Event details not found.</span>
                </EmptyState>
            )}

            {!helper.isEmpty(event, "object") && (
            <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                <div className="grid gap-[0.9rem] md:grid-cols-2">
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Title</span>
                        <input className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Category</span>
                        <input className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Venue</span>
                        <input className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.venue} onChange={(e) => setForm((prev) => ({ ...prev, venue: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Venue address</span>
                        <input className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.venue_address} onChange={(e) => setForm((prev) => ({ ...prev, venue_address: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Start date</span>
                        <input type="date" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.start_date} onChange={(e) => setForm((prev) => ({ ...prev, start_date: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">Start time</span>
                        <input type="time" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.start_time} onChange={(e) => setForm((prev) => ({ ...prev, start_time: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">End date</span>
                        <input type="date" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.end_date} onChange={(e) => setForm((prev) => ({ ...prev, end_date: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem]">
                        <span className="font-mona-medium text-[12px] pag-800">End time</span>
                        <input type="time" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.end_time} onChange={(e) => setForm((prev) => ({ ...prev, end_time: e.target.value }))} />
                    </label>
                    <label className="space-y-[0.35rem] md:col-span-2">
                        <span className="font-mona-medium text-[12px] pag-800">Cost</span>
                        <input type="number" min="0" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.cost} onChange={(e) => setForm((prev) => ({ ...prev, cost: e.target.value }))} />
                    </label>
                </div>

                <Divider />

                <label className="space-y-[0.35rem] block">
                    <span className="font-mona-medium text-[12px] pag-800">Description</span>
                    <textarea rows={8} className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}></textarea>
                </label>
            </div>
            )}
        </section>
    );
};

export default EventEditPage;
