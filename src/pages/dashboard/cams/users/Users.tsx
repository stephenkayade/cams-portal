import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import useSidebar from "../../../../hooks/useSidebar";
import useUsers from "../../../../hooks/app/useUsers";
import DataTable from "../shared/DataTable";

const Users = () => {
    useSidebar({ type: "page", init: true });

    const [query, setQuery] = useState({ limit: 20, page: 1 });
    const { users, getUsers } = useUsers();

    useEffect(() => {
        getUsers({ limit: query.limit, page: query.page });
    }, [getUsers, query]);

    const handlePaginationChange = async (data: any) => {
        setQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    return (
        <div className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Users", font: "uncut", weight: "semibold" }}
                description="Operational users of cams."
            />

            <DataTable
                headers={["User", "Email", "Role", "Status"]}
                rows={users.data.map((item: any) => [
                    [item.firstName, item.lastName].filter(Boolean).join(" ") || item.email || "-",
                    item.email || "-",
                    item.role || item.userType || "-",
                    item.status || "active"
                ])}
                empty="No users were returned"
                pagination={{
                    title: "users",
                    source: users,
                    limit: query.limit,
                    onChange: handlePaginationChange
                }}
            />
        </div>
    );
};

export default Users;
