import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import SearchInput from "../../../../components/partials/inputs/SearchInput";
import useSidebar from "../../../../hooks/useSidebar";
import useEvents from "../../../../hooks/app/useEvents";
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import TableFooter from "../../../../components/partials/table/TableFooter";
import Placeholder from "../../../../components/partials/Placeholder";
import Button from "../../../../components/partials/buttons/Button";
import routil from "../../../../utils/routes.util";
import EventCard from "./components/EventCard";
import EventExportModal from "./components/EventExportModal";

const Events = () => {
    useSidebar({ type: "page", init: true });
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [appliedKeyword, setAppliedKeyword] = useState("");
    const [query, setQuery] = useState({ limit: 20, page: 1 });
    const [activeEvent, setActiveEvent] = useState<Record<string, any> | null>(null);
    const [showExport, setShowExport] = useState(false);
    const { events, selectedEvent, getEvents, setSelectedEvent } = useEvents();

    useEffect(() => {
        getEvents({ limit: query.limit, page: query.page, key: appliedKeyword || undefined });
    }, [appliedKeyword, getEvents, query]);

    const handlePaginationChange = async (data: any) => {
        setQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    return (
        <div className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Events", font: "uncut", weight: "semibold" }}
                description="Event selection powers the rest of the modules."
            >
                <Button
                    type="primary"
                    semantic="blue"
                    size="rg"
                    text={{ label: "Add event", size: 14 }}
                    className="min-w-[120px]"
                    onClick={(e: any) => {
                        e.preventDefault();
                        navigate(routil.inRoute({ route: "events", name: "event-add" }));
                    }}
                />
            </PageHeader>

            <div className="max-w-[360px]">
                <SearchInput
                    placeholder="Search events"
                    size="rg"
                    hasResult={false}
                    onChange={(e) => setKeyword(e.target.value)}
                    onSearch={() => {
                        setAppliedKeyword(keyword);
                        setQuery((prev) => ({ ...prev, page: 1 }));
                    }}
                    onFocus={() => { }}
                />
            </div>

            {events.loading ? (
                <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={`event-card-placeholder-${index + 1}`} className="overflow-hidden rounded-[0.6rem] border bdr-pag-100">
                            <Placeholder block={true} width={undefined} height="h-[116px] min-h-[116px]" radius="rounded-none" />
                            <div className="space-y-[0.8rem] px-[1rem] py-[1rem]">
                                <Placeholder block={true} width="w-[70%]" height="h-[14px] min-h-[14px]" />
                                <Placeholder block={true} width="w-[45%]" height="h-[11px] min-h-[11px]" />
                                <Placeholder block={true} width="w-full" height="h-[10px] min-h-[10px]" />
                                <Placeholder block={true} width="w-[82%]" height="h-[10px] min-h-[10px]" />
                                <Placeholder block={true} width="w-[40%]" height="h-[30px] min-h-[30px]" radius="rounded-[999px]" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : events.data.length === 0 ? (
                <EmptyState className="min-h-[260px]">
                    <div className="px-[1rem] text-center">
                        <p className="font-uncut-semibold text-[20px] pag-900">Nothing to show yet</p>
                        <p className="mt-[0.4rem] font-mona-light text-[14px] pag-500">No events were returned.</p>
                    </div>
                </EmptyState>
            ) : (
                <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 xl:grid-cols-3">
                    {events.data.map((event: any) => {
                        const isSelected = selectedEvent?._id === event._id;

                        return (
                            <EventCard
                                key={event._id || event.id}
                                event={event}
                                selected={isSelected}
                                onSelect={() => setSelectedEvent(event)}
                                actions={[
                                    {
                                        label: "View event details",
                                        value: `details-${event._id || event.id}`,
                                        icon: { type: "feather", name: "eye", size: 14 },
                                        onClick: (e) => {
                                            e.preventDefault();
                                            navigate(
                                                routil.inRoute({
                                                    route: "events",
                                                    name: "event-details",
                                                    params: [{ type: "url", name: "id", value: event._id || event.id }]
                                                })
                                            );
                                        }
                                    },
                                    {
                                        label: "Edit event details",
                                        value: `edit-${event._id || event.id}`,
                                        icon: { type: "feather", name: "edit-2", size: 14 },
                                        onClick: (e) => {
                                            e.preventDefault();
                                            navigate(
                                                routil.inRoute({
                                                    route: "events",
                                                    name: "event-edit",
                                                    params: [{ type: "url", name: "id", value: event._id || event.id }]
                                                })
                                            );
                                        }
                                    },
                                    {
                                        label: "Export event data",
                                        value: `export-${event._id || event.id}`,
                                        icon: { type: "feather", name: "download", size: 14 },
                                        onClick: (e) => {
                                            e.preventDefault();
                                            setActiveEvent(event);
                                            setShowExport(true);
                                        }
                                    },
                                    {
                                        label: isSelected ? "Current event context" : "Use as event context",
                                        value: isSelected ? "current" : "select",
                                        icon: { type: "feather", name: isSelected ? "check" : "target", size: 14 },
                                        onClick: (e) => {
                                            e.preventDefault();
                                            setSelectedEvent(event);
                                        }
                                    },
                                    {
                                        label: "Refresh event list",
                                        value: `refresh-${event._id || event.id}`,
                                        icon: { type: "feather", name: "refresh-cw", size: 14 },
                                        onClick: async (e) => {
                                            e.preventDefault();
                                            await getEvents({ limit: query.limit, page: query.page, key: appliedKeyword || undefined });
                                        }
                                    }
                                ]}
                            />
                        );
                    })}
                </div>
            )}

            {!events.loading && events.data.length > 0 && (
                <TableFooter
                    title="events"
                    type="self"
                    resource="default"
                    source={events}
                    limit={query.limit}
                    onChange={handlePaginationChange}
                />
            )}

            <EventExportModal
                show={showExport}
                event={activeEvent}
                onClose={() => setShowExport(false)}
            />
        </div>
    );
};

export default Events;
