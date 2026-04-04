import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import useSidebar from "../../../../hooks/useSidebar";
import useReports from "../../../../hooks/app/useReports";
import DataTable from "../shared/DataTable";

const Reports = () => {
    useSidebar({ type: "page", init: true });

    const [query, setQuery] = useState({ limit: 20, page: 1 });
    const { reports, getReports } = useReports();

    useEffect(() => {
        getReports({ limit: query.limit, page: query.page });
    }, [getReports, query]);

    const handlePaginationChange = async (data: any) => {
        setQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    return (
        <div className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Reports", font: "uncut", weight: "semibold" }}
                description="Center reports"
            />

            <DataTable
                headers={["Center", "Month", "Year", "Updated"]}
                rows={reports.data.map((item: any) => [
                    item.center?.title || item.center?.name || "-",
                    item.month || "-",
                    item.year || "-",
                    item.updatedAt || item.createdAt || "-"
                ])}
                empty="No reports were returned"
                pagination={{
                    title: "reports",
                    source: reports,
                    limit: query.limit,
                    onChange: handlePaginationChange
                }}
            />
        </div>
    );
};

export default Reports;
