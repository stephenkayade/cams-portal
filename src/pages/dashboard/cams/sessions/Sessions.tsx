import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import useSidebar from "../../../../hooks/useSidebar";
import useSessions from "../../../../hooks/app/useSessions";
import DataTable from "../shared/DataTable";

const Sessions = () => {
    useSidebar({ type: "page", init: true });

    const [query, setQuery] = useState({ limit: 20, page: 1 });
    const { sessions, getSessions } = useSessions();

    useEffect(() => {
        getSessions({ limit: query.limit, page: query.page, payload: { status: "active" } });
    }, [getSessions, query]);

    const handlePaginationChange = async (data: any) => {
        setQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    return (
        <div className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Sessions", font: "uncut", weight: "semibold" }}
                description="Active session"
            />

            <DataTable
                headers={["Center", "Event", "Status", "Updated"]}
                rows={sessions.data.map((item: any) => [
                    item.center?.title || item.center?.name || item.event?.center?.title || item.event?.center?.name || "-",
                    item.event?.title || "-",
                    item.status || "active",
                    item.updatedAt || item.createdAt || "-"
                ])}
                empty="No sessions were returned"
                pagination={{
                    title: "sessions",
                    source: sessions,
                    limit: query.limit,
                    onChange: handlePaginationChange
                }}
            />
        </div>
    );
};

export default Sessions;
