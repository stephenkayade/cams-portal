import React, { useEffect } from "react";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import useSidebar from "../../../../hooks/useSidebar";
import useEvents from "../../../../hooks/app/useEvents";
import useParticipants from "../../../../hooks/app/useParticipants";
import useAccommodations from "../../../../hooks/app/useAccommodations";
import useResources from "../../../../hooks/app/useResources";
import useSessions from "../../../../hooks/app/useSessions";
import useReports from "../../../../hooks/app/useReports";
import EventSelector from "./components/EventSelector";
import StatCard from "./components/StatCard";

const Dashboard = () => {
    useSidebar({ type: "page", init: true });

    const { events, selectedEvent, stats, getEvents, getEventStats, setSelectedEvent } = useEvents();
    const { participants, getParticipants } = useParticipants();
    const { accommodations, rooms, getAccommodations, getRoomsByAccommodation } = useAccommodations();
    const { resourceGroups, getEventResourceGroups } = useResources();
    const { sessions, getSessions } = useSessions();
    const { reports, getReports } = useReports();

    useEffect(() => {
        getEvents({ limit: 12, page: 1 });
        getSessions({ limit: 8, page: 1 });
        getReports({ limit: 8, page: 1 });
    }, [getEvents, getReports, getSessions]);

    useEffect(() => {
        if (!selectedEvent?._id) {
            return;
        }

        getEventStats(selectedEvent._id);
        getParticipants({ limit: 12, page: 1, payload: { event: selectedEvent._id } });
        getAccommodations({ limit: 12, page: 1, payload: { event: selectedEvent._id } });
        getEventResourceGroups({ limit: 12, page: 1, payload: { event: selectedEvent._id } });
    }, [getAccommodations, getEventResourceGroups, getEventStats, getParticipants, selectedEvent?._id]);

    useEffect(() => {
        if (!accommodations.data?.length) {
            return;
        }

        const firstAccommodation = accommodations.data[0];
        if (firstAccommodation?._id) {
            getRoomsByAccommodation({ limit: 12, page: 1, payload: { accommodationId: firstAccommodation._id } });
        }
    }, [accommodations.data, getRoomsByAccommodation]);

    return (
        <div className="space-y-[1.1rem]">
            <PageHeader
                title={{ text: "Dashboard Home", font: "uncut", weight: "semibold" }}
                description="Statistics for the selected event"
            />

            <EventSelector
                events={events.data}
                selectedEvent={selectedEvent}
                onChange={setSelectedEvent}
                onRefresh={() => getEvents({ limit: 12, page: 1 })}
            />

            <div className="grid gap-[1rem] md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Events" value={events.count || events.data.length} helper="Active event catalog" />
                <StatCard label="Participants" value={stats?.totalParticipants || participants.count || participants.data.length} helper="Current selected event population" />
                <StatCard label="Accommodations" value={accommodations.count || accommodations.data.length} helper="Venue and housing inventory" />
                <StatCard label="Resources" value={resourceGroups.count || resourceGroups.data.length} helper="Assigned groups for the event" />
            </div>

            <div className="grid gap-[1rem] lg:grid-cols-3">
                <StatCard label="Checked In" value={stats?.checkedIn || 0} helper="Participants already checked in" />
                <StatCard label="Rooms Loaded" value={rooms.count || rooms.data.length} helper="Rooms under the first accommodation in view" />
                <StatCard label="Open Sessions" value={sessions.count || sessions.data.length} helper="Active sessions" />
            </div>

            <div className="grid gap-[1rem] lg:grid-cols-2">
                <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                    <p className="font-uncut-semibold text-[18px] pag-950">Selected Event</p>
                    <p className="mt-[0.5rem] font-mona-light text-[14px] pag-500">
                        {selectedEvent?.title || "No event selected yet. Pick one above to drive participants, accommodations, and resource modules."}
                    </p>
                </div>

                <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                    <p className="font-uncut-semibold text-[18px] pag-950">Center Reports</p>
                    <p className="mt-[0.5rem] font-mona-light text-[14px] pag-500">
                        {reports.count || reports.data.length} reports are available .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
