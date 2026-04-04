import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import FormField from "../../../../components/partials/inputs/FormField";
import TextInput from "../../../../components/partials/inputs/TextInput";
import TextAreaInput from "../../../../components/partials/inputs/TextAreaInput";
import Filter from "../../../../components/partials/drops/Filter";
import Button from "../../../../components/partials/buttons/Button";
import FileInput from "../../../../components/partials/inputs/FileInput";
import Checkbox from "../../../../components/partials/inputs/Checkbox";
import Divider from "../../../../components/partials/Divider";
import Alert from "../../../../components/partials/ui/Alert";
import useSidebar from "../../../../hooks/useSidebar";
import useEvents from "../../../../hooks/app/useEvents";
import useResources from "../../../../hooks/app/useResources";
import useToast from "../../../../hooks/useToast";
import routil from "../../../../utils/routes.util";
import storage from "../../../../utils/storage.util";

const AddEventPage = () => {
    useSidebar({ type: "page", init: true });

    const navigate = useNavigate();
    const { setToast } = useToast();
    const { createEvent, getCenters, centers } = useEvents();
    const { getPossibleTypes, possibleTypes } = useResources();

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<Array<string>>([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        venue: "",
        venue_address: "",
        category: "",
        center: "",
        cost: "",
        canStartRegistration: "",
        flier_url: "",
        isRegistrable: ""
    });

    useEffect(() => {
        storage.keep("route.name", "events");
        getCenters();
        getPossibleTypes();
    }, [getCenters, getPossibleTypes]);

    const centerOptions = useMemo(() => (
        centers.data.map((center: any) => ({
            label: center.title || center.name,
            value: center._id
        }))
    ), [centers.data]);

    const categoryOptions = [
        { label: "Central", value: "central" },
        { label: "Center", value: "center" }
    ];

    const yesNoOptions = [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" }
    ];

    const pushToast = (type: "success" | "error", message: string) => {
        setToast({
            show: true,
            type,
            title: type === "success" ? "Success" : "Error",
            message,
            position: "top-right"
        });
    };

    const validate = () => {
        if (!form.title.trim()) return "Event title is required";
        if (!form.description.trim()) return "Event description is required";
        if (!form.start_date) return "A start date is required";
        if (!form.start_time) return "A start time is required";
        if (!form.end_date) return "An end date is required";
        if (!form.end_time) return "An end time is required";
        if (!form.venue.trim()) return "Event venue is required";
        if (!form.venue_address.trim()) return "Event address is required";
        if (!form.category) return "Event category is required";
        if (form.category === "center" && !form.center) return "Center is required for center events";
        if (form.cost === "") return "Event cost is required";
        if (!form.isRegistrable) return "Please specify if the event is registrable";
        if (!form.canStartRegistration) return "Please specify if registration can start";
        if (selectedCategories.length === 0) return "Select category associated with this event";
        return "";
    };

    const handleSubmit = async () => {
        const message = validate();
        setError(message);

        if (message) {
            pushToast("error", message);
            return;
        }

        setSubmitting(true);
        const response = await createEvent({
            title: form.title.trim(),
            description: form.description.trim(),
            start_date: form.start_date,
            start_time: form.start_time,
            end_date: form.end_date,
            end_time: form.end_time,
            venue: form.venue.trim(),
            venue_address: form.venue_address.trim(),
            category: form.category,
            center: form.category === "center" ? form.center : null,
            cost: Number(form.cost),
            canStartRegistration: form.canStartRegistration === "true",
            isRegistrable: form.isRegistrable === "true",
            flier_url: form.flier_url,
            categoryTypes: selectedCategories
        });
        setSubmitting(false);

        if (!response.error) {
            pushToast("success", response.message || "Event created successfully");
            navigate(routil.computePath("/events"));
            return;
        }

        setError(response.message || "Unable to create event");
        pushToast("error", response.message || "Unable to create event");
    };

    return (
        <section className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Add Event", font: "uncut", weight: "semibold" }}
                description="Create a new CAMS event using the portal form experience."
            >
                <div className="flex items-center gap-[0.6rem]">
                    <Button
                        type="ghost"
                        semantic="default"
                        size="rg"
                        text={{ label: "Back to events", size: 12 }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(routil.computePath("/events"));
                        }}
                    />
                    <Button
                        loading={submitting}
                        type="primary"
                        semantic="blue"
                        size="rg"
                        text={{ label: "Create event", size: 12 }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    />
                </div>
            </PageHeader>

            {error && <Alert show={true} type="error" message={error} className="mb-0" />}

            <div className="grid gap-[1rem] xl:grid-cols-[1fr_1fr]">
                <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                    <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2">
                        <FormField>
                            <TextInput
                                type="text"
                                size="rg"
                                placeholder="Event name"
                                value={form.title}
                                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                                label={{ title: "Event name", required: true, fontSize: 13 }}
                            />
                        </FormField>

                        <FormField>
                            <TextInput
                                type="text"
                                size="rg"
                                placeholder="Venue"
                                value={form.venue}
                                onChange={(e) => setForm((prev) => ({ ...prev, venue: e.target.value }))}
                                label={{ title: "Venue", required: true, fontSize: 13 }}
                            />
                        </FormField>

                        <FormField className="md:col-span-2">
                            <TextAreaInput
                                rows={5}
                                placeholder="Describe the event"
                                value={form.description}
                                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                                label={{ title: "Description", required: true, fontSize: 13 }}
                            />
                        </FormField>

                        <FormField>
                            <label className="mrgb0"><span className="font-mona pag-900 text-[13px]">Start date</span><span className="color-red font-mona-medium relative text-[16px] top-[5px] left-[3px]">*</span></label>
                            <input type="date" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.start_date} onChange={(e) => setForm((prev) => ({ ...prev, start_date: e.target.value }))} />
                        </FormField>

                        <FormField>
                            <label className="mrgb0"><span className="font-mona pag-900 text-[13px]">End date</span><span className="color-red font-mona-medium relative text-[16px] top-[5px] left-[3px]">*</span></label>
                            <input type="date" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.end_date} onChange={(e) => setForm((prev) => ({ ...prev, end_date: e.target.value }))} />
                        </FormField>

                        <FormField>
                            <label className="mrgb0"><span className="font-mona pag-900 text-[13px]">Start time</span><span className="color-red font-mona-medium relative text-[16px] top-[5px] left-[3px]">*</span></label>
                            <input type="time" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.start_time} onChange={(e) => setForm((prev) => ({ ...prev, start_time: e.target.value }))} />
                        </FormField>

                        <FormField>
                            <label className="mrgb0"><span className="font-mona pag-900 text-[13px]">End time</span><span className="color-red font-mona-medium relative text-[16px] top-[5px] left-[3px]">*</span></label>
                            <input type="time" className="form-control w-full border bdr-pag-200 px-[1rem] py-[0.75rem] font-mona text-[13px] pag-700 bdrf-pacb-400" value={form.end_time} onChange={(e) => setForm((prev) => ({ ...prev, end_time: e.target.value }))} />
                        </FormField>

                        <FormField className="md:col-span-2">
                            <TextInput
                                type="text"
                                size="rg"
                                placeholder="Venue address"
                                value={form.venue_address}
                                onChange={(e) => setForm((prev) => ({ ...prev, venue_address: e.target.value }))}
                                label={{ title: "Venue address", required: true, fontSize: 13 }}
                            />
                        </FormField>
                    </div>
                </div>

                <div className="space-y-[1rem]">
                    <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                        <div className="grid grid-cols-2 gap-[1rem]">
                            <FormField label={{ title: "Event category", required: true, fontSize: 13 }}>
                                <Filter
                                    size="rg"
                                    placeholder="Select type of event"
                                    position="bottom"
                                    defaultValue={form.category}
                                    menu={{ style: {}, search: false, fullWidth: true, limitHeight: "sm" }}
                                    items={categoryOptions}
                                    noFilter={false}
                                    onChange={(data) => setForm((prev) => ({ ...prev, category: data.value, center: "" }))}
                                />
                            </FormField>

                            {form.category === "center" && (
                                <FormField label={{ title: "Center", required: true, fontSize: 13 }}>
                                    <Filter
                                        size="rg"
                                        placeholder="Select center"
                                        position="bottom"
                                        defaultValue={form.center}
                                        menu={{ style: {}, search: true, fullWidth: true, limitHeight: "md" }}
                                        items={centerOptions}
                                        noFilter={false}
                                        onChange={(data) => setForm((prev) => ({ ...prev, center: data.value }))}
                                    />
                                </FormField>
                            )}

                            <FormField>
                                <TextInput
                                    type="text"
                                    size="rg"
                                    placeholder="0.00"
                                    value={form.cost}
                                    onChange={(e) => setForm((prev) => ({ ...prev, cost: e.target.value }))}
                                    label={{ title: "Cost", required: true, fontSize: 13 }}
                                />
                            </FormField>

                            <FormField label={{ title: "Registrable?", required: true, fontSize: 13 }}>
                                <Filter
                                    size="rg"
                                    placeholder="Can attendees register?"
                                    position="bottom"
                                    defaultValue={form.isRegistrable}
                                    menu={{ style: {}, search: false, fullWidth: true, limitHeight: "sm" }}
                                    items={yesNoOptions}
                                    noFilter={false}
                                    onChange={(data) => setForm((prev) => ({ ...prev, isRegistrable: data.value }))}
                                />
                            </FormField>

                            <FormField label={{ title: "Start registration", required: true, fontSize: 13 }}>
                                <Filter
                                    size="rg"
                                    placeholder="Should registration start now?"
                                    position="bottom"
                                    defaultValue={form.canStartRegistration}
                                    menu={{ style: {}, search: false, fullWidth: true, limitHeight: "sm" }}
                                    items={yesNoOptions}
                                    noFilter={false}
                                    onChange={(data) => setForm((prev) => ({ ...prev, canStartRegistration: data.value }))}
                                />
                            </FormField>
                        </div>
                    </div>

                    <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                        <p className="font-uncut-semibold text-[18px] pag-950">Associated resource categories</p>
                        <p className="mt-[0.2rem] font-mona-light text-[13px] pag-500">Select all categories associated with this event.</p>
                        <Divider />
                        <div className="grid grid-cols-2 gap-[0.75rem]">
                            {possibleTypes.map((category: any) => {
                                const checked = selectedCategories.includes(category.value);
                                return (
                                    <div key={category.value || category.title} className="rounded-[10px] border bdr-pag-100 px-[0.8rem] py-[0.8rem]">
                                        <Checkbox
                                            id={category.title}
                                            checked={checked}
                                            size="sm"
                                            label={{ title: category.title }}
                                            onChange={() => {
                                                setSelectedCategories((prev) => prev.includes(category.value) ? prev.filter((item) => item !== category.value) : [...prev, category.value]);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                        <p className="font-uncut-semibold text-[18px] pag-950">Event flier</p>
                        <p className="mt-[0.2rem] font-mona-light text-[13px] pag-500">Upload an image to represent this event in the catalog.</p>
                        <Divider />
                        <FileInput
                            accept="image"
                            placeholder="Choose event flier"
                            label={{ title: "Flier upload", required: false, fontSize: 13 }}
                            onChange={(file: any) => setForm((prev) => ({ ...prev, flier_url: file?.base64 || "" }))}
                        />
                        {form.flier_url && (
                            <div className="mt-[1rem] rounded-[12px] border bdr-pag-100 bg-pag-25 p-[0.5rem]">
                                <div className="h-[180px] rounded-[10px] bg-cover bg-center" style={{ backgroundImage: `url('${form.flier_url}')` }}></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddEventPage;
