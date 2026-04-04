import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import useSidebar from "../../../../hooks/useSidebar";
import useEvents from "../../../../hooks/app/useEvents";
import useAccommodations from "../../../../hooks/app/useAccommodations";
import DataTable from "../shared/DataTable";

const Accommodations = () => {
    useSidebar({ type: "page", init: true });

    const [query, setQuery] = useState({ limit: 20, page: 1 });
    const { selectedEvent } = useEvents();
    const { accommodations, getAccommodations } = useAccommodations();

    useEffect(() => {
        if (!selectedEvent?._id) {
            return;
        }

        getAccommodations({ limit: query.limit, page: query.page, payload: { event: selectedEvent._id } });
    }, [getAccommodations, query, selectedEvent?._id]);

    useEffect(() => {
        setQuery((prev) => prev.page !== 1 ? { ...prev, page: 1 } : prev);
    }, [selectedEvent?._id]);

    const handlePaginationChange = async (data: any) => {
        setQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    const rows = accommodations.data.map((item: any) => [
        item.title || "-",
        item.type || item.category || "-",
        item.totalSlots || item.capacity || "-",
        item.availableSlots || item.available || "-",
        item.gender || "-"
    ]);

    return (
        <div className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Accommodations", font: "uncut", weight: "semibold" }}
                description={selectedEvent?.title ? `Venue inventory for ${selectedEvent.title}.` : "Select an event context to load accommodations."}
            />

            <DataTable
                headers={["Title", "Type", "Total Slots", "Available", "Gender"]}
                rows={rows}
                empty={selectedEvent?._id ? "No accommodations were returned for this event." : "Select an event context to load accommodations."}
                pagination={selectedEvent?._id ? {
                    title: "accommodations",
                    source: accommodations,
                    limit: query.limit,
                    onChange: handlePaginationChange
                } : undefined}
            />
        </div>
    );
};

export default Accommodations;
