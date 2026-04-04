import React from "react";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import SearchInput from "../../../../components/partials/inputs/SearchInput";
import Badge from "../../../../components/partials/badges/Badge";
import DataTable from "../shared/DataTable";
import CardUI from "../../../../components/partials/ui/CardUI";
import { useParticipantListPage } from "./hooks/useParticipant";

const Participants = () => {
    const {
        participants,
        selectedEvent,
        keyword,
        setKeyword,
        handleSearch,
        handlePaginationChange,
        goToParticipantDetails,
        rowActions,
        query
    } = useParticipantListPage();

    const rows = participants.data.map((participant: any) => [
        <div className="space-y-[0.15rem]">
            <button
                type="button"
                className="text-left"
                onClick={() => goToParticipantDetails(participant._id)}
            >
                <p className="font-mona-medium text-[14px] pag-900 underline-offset-[3px] hover:underline">
                    {[participant.firstName, participant.lastName].filter(Boolean).join(" ") || "Unknown participant"}
                </p>
            </button>
            <p className="font-mona-light text-[12px] pag-500">{participant.email || "-"}</p>
        </div>,
        participant.phone || "-",
        participant.center?.title || participant.center?.name || "-",
        <Badge
            type={participant.checkedIn ? "success" : "warning"}
            size="sm"
            display="status"
            label={participant.checkedIn ? "Checked In" : "Pending"}
            upper={false}
            close={false}
        />,
        participant.attendanceMode || "-"
    ]);

    return (
        <div className="space-y-[1rem]">

            <CardUI>

                <PageHeader
                    title={{ text: "Participants", font: "uncut", weight: "semibold" }}
                    description={selectedEvent?.title ? `Showing participants for ${selectedEvent.title}.` : "Choose an event from the Events page"}
                />
            </CardUI>

            <CardUI className="space-y-[2rem]">

                <div className="max-w-[360px]">
                    <SearchInput
                    placeholder="Search participants"
                    size="sm"
                    hasResult={false}
                    onChange={(e) => setKeyword(e.target.value)}
                    onSearch={handleSearch}
                    onFocus={() => { }}
                />
            </div>

                <DataTable
                    headers={["Participant", "Phone", "Center", "Check-in", "Attendance"]}
                    rows={rows}
                    rowActions={rowActions}
                    empty={selectedEvent?._id ? "No participants matched this event yet." : "Select an event context to load participants."}
                    pagination={selectedEvent?._id ? {
                        title: "participants",
                        source: participants,
                        limit: query.limit,
                        onChange: handlePaginationChange
                    } : undefined}
                />

            </CardUI>
        </div>
    );
};

export default Participants;
