import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardUI from "../../../../components/partials/ui/CardUI";
import Divider from "../../../../components/partials/Divider";
import Badge from "../../../../components/partials/badges/Badge";
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import Button from "../../../../components/partials/buttons/Button";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import helper from "../../../../utils/helper.util";
import routil from "../../../../utils/routes.util";
import useEvents from "../../../../hooks/app/useEvents";
import useSidebar from "../../../../hooks/useSidebar";
import storage from "../../../../utils/storage.util";
import EventExportModal from "./components/EventExportModal";

const EventDetailsPage = () => {
    useSidebar({ type: "page", init: true });

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { event, stats, loading, getEvent, getEventStats } = useEvents();
    const [showExport, setShowExport] = React.useState(false);

    useEffect(() => {
        storage.keep("route.name", "events");
    }, []);

    useEffect(() => {
        if (!id) {
            return;
        }

        getEvent(id);
        getEventStats(id);
    }, [getEvent, getEventStats, id]);

    const totalOnsiteParticipants = (stats?.totalAdultOnsiteParticipants || 0) + (stats?.totalChildrenOnsiteParticipants || 0);
    const statsCards = [
        { label: "Total Participants", value: stats?.totalParticipants || 0, helperText: "Registered attendees" },
        { label: "Online", value: stats?.totalOnlineParticipants || 0, helperText: "Virtual attendance" },
        { label: "Onsite", value: totalOnsiteParticipants, helperText: "Adults and children onsite" },
        { label: "Checked In", value: stats?.totalCheckedInParticipants || 0, helperText: "Completed check-in" },
        { label: "Male", value: stats?.totalMaleParticipants || 0, helperText: "Male participants" },
        { label: "Female", value: stats?.totalFemaleParticipants || 0, helperText: "Female participants" },
        { label: "With Accommodation", value: stats?.totalParticipantsWithAccommodation || 0, helperText: "Assigned lodging" },
        { label: "With Service Point", value: stats?.totalParticipantsWithServicePoint || 0, helperText: "Assigned service points" }
    ];

    return (
        <section className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Event details", font: "uncut", weight: "semibold" }}
                description="Styled after the events app detail experience, with CAMS event statistics included."
            >
                <div className="flex items-center gap-[0.6rem]">
                    <Button
                        type="ghost"
                        semantic="default"
                        size="xxsm"
                        text={{ label: "Back to events", size: 12 }}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(routil.computePath("/events"));
                        }}
                    />
                    {id && (
                        <>
                            <Button
                                type="ghost"
                                semantic="default"
                                size="xxsm"
                                text={{ label: "Export data", size: 12 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowExport(true);
                                }}
                            />
                            <Button
                                type="primary"
                                semantic="blue"
                                size="xxsm"
                                text={{ label: "Edit event", size: 12 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                        routil.inRoute({
                                            route: "events",
                                            name: "event-edit",
                                            params: id ? [{ type: "url", name: "id", value: id }] : []
                                        })
                                    );
                                }}
                            />
                        </>
                    )}
                </div>
            </PageHeader>

            {loading && (
                <EmptyState className="min-h-[50vh]" noBound={true}>
                    <span className="loader lg primary"></span>
                    <span className="font-mona text-[16px] pas-950">Fetching event data</span>
                </EmptyState>
            )}

            {!loading && helper.isEmpty(event, "object") && (
                <EmptyState className="min-h-[50vh]" noBound={true}>
                    <span className="font-mona text-[14px] pas-950">Event details not found.</span>
                </EmptyState>
            )}

            {!loading && !helper.isEmpty(event, "object") && (
                <>
                    <CardUI>
                        <div className="grid gap-[1.25rem] lg:grid-cols-[35%_60%]">
                            <div>
                                <div
                                    className="min-h-[220px] rounded-[14px] full-bg border bdr-pag-100"
                                    style={{
                                        backgroundImage: `url("${event.flier_url || "https://storage.googleapis.com/pacitude-buckets/bg%40core_01.png"}")`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center"
                                    }}
                                ></div>
                            </div>

                            <div>
                                <div className="flex items-start">
                                    <div className="space-y-[0.5rem]">
                                        <h3 className="font-mona-medium pas-950 text-[20px]">{event.title || "Untitled Event"}</h3>
                                        <div className="flex flex-wrap items-center gap-[0.75rem]">
                                            <h3 className="font-mona-light pag-600 text-[13px]">ID: {event.tag || event.slug || event._id?.substring?.(0, 8)?.toUpperCase?.() || event._id}</h3>
                                            <h3 className="font-mona-light pag-600 text-[13px]">Category: {event.category || "General"}</h3>
                                        </div>
                                    </div>

                                    <div className="ml-auto">
                                        <Badge
                                            type={event.isRegistrable === false ? "warning" : "success"}
                                            size="sm"
                                            display="status"
                                            label={event.isRegistrable === false ? "Closed" : "Registrable"}
                                            padding={{ y: 3, x: 10 }}
                                            font={{ weight: "regular", size: 10 }}
                                            upper={true}
                                            close={false}
                                        />
                                    </div>
                                </div>

                                <Divider />

                                <div className="flex flex-wrap items-center gap-[0.7rem]">
                                    <h4 className="flex items-center gap-x-[0.5rem]">
                                        <span className="font-mona-light pag-500 text-[15px]">Venue - </span>
                                        <span className="font-mona pag-800 text-[15px]">{event.venue || event.location || "TBD"}</span>
                                    </h4>
                                    <span className="pag-300">|</span>
                                    <h4 className="flex items-center gap-x-[0.5rem]">
                                        <span className="font-mona-light pag-500 text-[15px]">Cost - </span>
                                        <span className="font-mona pag-800 text-[15px]">{event.cost > 0 ? helper.formatCurrency(event.cost) : "Free"}</span>
                                    </h4>
                                </div>

                                <Divider />

                                <div className="space-y-[0.5rem]">
                                    <h4 className="flex gap-x-[0.5rem]">
                                        <span className="font-mona-light pag-500 text-[15px] shrink-0">Description - </span>
                                        <span className="font-mona pag-800 text-[15px]">{event.description || "No detailed description available for this event."}</span>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </CardUI>

                    <CardUI>
                        <div className="grid gap-[1rem] md:grid-cols-2 xl:grid-cols-4">
                            <div className="space-y-[0.9rem]">
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-mona pag-800 text-[13px]">Starts On:</h3>
                                    <p className="font-mona pag-600 text-[13px]">{event.start_date ? helper.formatDate(event.start_date, "basic-month") : "---"}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-mona pag-800 text-[13px]">Starts At:</h3>
                                    <p className="font-mona pag-600 text-[13px]">{event.start_time || "---"}</p>
                                </div>
                            </div>

                            <div className="space-y-[0.9rem]">
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-mona pag-800 text-[13px]">Ends On:</h3>
                                    <p className="font-mona pag-600 text-[13px]">{event.end_date ? helper.formatDate(event.end_date, "basic-month") : "---"}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-mona pag-800 text-[13px]">Ends At:</h3>
                                    <p className="font-mona pag-600 text-[13px]">{event.end_time || "---"}</p>
                                </div>
                            </div>

                            <div className="space-y-[0.9rem]">
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-mona pag-800 text-[13px]">Recurring:</h3>
                                    <p className="font-mona pag-600 text-[13px]">{event.isRecurring ? "Yes" : "No"}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-mona pag-800 text-[13px]">Family Cost:</h3>
                                    <p className="font-mona pag-600 text-[13px]">{event.familyCostApplicable ? helper.formatCurrency(event.familyCost || 0) : "N/A"}</p>
                                </div>
                            </div>

                            <div className="space-y-[0.9rem]">
                                <div className="flex gap-3 items-center">
                                    <h3 className="font-mona pag-800 text-[13px]">Venue Address:</h3>
                                </div>
                                <p className="font-mona pag-600 text-[13px]">{event.venue_address || "---"}</p>
                            </div>
                        </div>

                        <div className="py-[1rem]">
                            <Divider show={true} padding={{ enable: true, top: "pt-[1rem]", bottom: "pb-[1.2rem]" }} />
                        </div>

                        <div className="grid gap-[1rem] md:grid-cols-2">
                            <div className="flex gap-3 items-center">
                                <h3 className="font-mona pag-800 text-[13px]">Created On:</h3>
                                <p className="font-mona pag-600 text-[13px]">{event.createdAt ? helper.formatDate(event.createdAt, "basic-month") : "---"}</p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <h3 className="font-mona pag-800 text-[13px]">Updated On:</h3>
                                <p className="font-mona pag-600 text-[13px]">{event.updatedAt ? helper.formatDate(event.updatedAt, "basic-month") : "---"}</p>
                            </div>
                        </div>
                    </CardUI>

                    <CardUI>
                        <div className="flex items-center">
                            <div className="space-y-[0.2rem]">
                                <h3 className="font-uncut-semibold text-[18px] pag-950">Event statistics</h3>
                                <p className="font-mona-light text-[13px] pag-500">Live CAMS participation stats for this event.</p>
                            </div>
                            <Button
                                type="ghost"
                                semantic="default"
                                size="xxsm"
                                className="ml-auto"
                                text={{ label: "Refresh stats", size: 12 }}
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if (id) {
                                        await getEventStats(id);
                                    }
                                }}
                            />
                        </div>

                        <Divider />

                        <div className="grid gap-[0.9rem] md:grid-cols-2 xl:grid-cols-4">
                            {statsCards.map((item) => (
                                <div key={item.label} className="rounded-[12px] border bdr-pag-100 bg-pag-25 px-[0.9rem] py-[0.9rem]">
                                    <p className="font-mona-medium text-[12px] uppercase tracking-wider pag-600">{item.label}</p>
                                    <h4 className="mt-[0.45rem] font-uncut-semibold text-[24px] pag-950">{item.value}</h4>
                                    <p className="mt-[0.2rem] font-mona-light text-[12px] pag-500">{item.helperText}</p>
                                </div>
                            ))}
                        </div>
                    </CardUI>
                </>
            )}

            <EventExportModal
                show={showExport}
                event={event}
                onClose={() => setShowExport(false)}
            />
        </section>
    );
};

export default EventDetailsPage;
