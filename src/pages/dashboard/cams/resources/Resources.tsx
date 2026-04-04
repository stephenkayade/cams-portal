import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import CardUI from "../../../../components/partials/ui/CardUI";
import useSidebar from "../../../../hooks/useSidebar";
import useEvents from "../../../../hooks/app/useEvents";
import useResources from "../../../../hooks/app/useResources";
import storage from "../../../../utils/storage.util";
import DataTable from "../shared/DataTable";

const Resources = () => {
    useSidebar({ type: "page", init: true });

    const [typesQuery, setTypesQuery] = useState({ limit: 20, page: 1 });
    const [groupsQuery, setGroupsQuery] = useState({ limit: 20, page: 1 });
    const { selectedEvent } = useEvents();
    const { resourceGroups, resourceGroupTypes, getEventResourceGroups, getResourceGroupTypes } = useResources();

    useEffect(() => {
        if (!selectedEvent?._id) {
            return;
        }

        getResourceGroupTypes({ limit: typesQuery.limit, page: typesQuery.page, payload: { event: selectedEvent._id } });
    }, [getResourceGroupTypes, selectedEvent?._id, typesQuery]);

    useEffect(() => {
        if (!selectedEvent?._id) {
            return;
        }

        getEventResourceGroups({ limit: groupsQuery.limit, page: groupsQuery.page, payload: { event: selectedEvent._id } });
    }, [getEventResourceGroups, groupsQuery, selectedEvent?._id]);

    useEffect(() => {
        setTypesQuery((prev) => prev.page !== 1 ? { ...prev, page: 1 } : prev);
        setGroupsQuery((prev) => prev.page !== 1 ? { ...prev, page: 1 } : prev);
    }, [selectedEvent?._id]);

    const configTab = (e: any, val: number) => {
        if (e) {
            e.preventDefault();
        }

        storage.keep("cams-resources-tab", val);
    };

    const handleTypesPaginationChange = async (data: any) => {
        setTypesQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    const handleGroupsPaginationChange = async (data: any) => {
        setGroupsQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    return (
        <div className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Resources", font: "uncut", weight: "semibold" }}
                description={selectedEvent?.title ? `Resource groups and types for ${selectedEvent.title}.` : "Select an event context to load resource data."}
            />

            <CardUI>
                <Tabs defaultIndex={Number(storage.fetch("cams-resources-tab") ?? 0)}>
                    <TabList>
                        <Tab onClick={(e: any) => { configTab(e, 0); }}>Resource Types</Tab>
                        <Tab onClick={(e: any) => { configTab(e, 1); }}>Resource Groups</Tab>
                    </TabList>

                    <TabPanel tabIndex={0}>
                        <div className="py-[1.5rem]">
                            <p className="mb-[0.75rem] font-uncut-semibold text-[18px] pag-950">Resource Types</p>
                            <DataTable
                                headers={["Title", "Event", "Created By"]}
                                rows={resourceGroupTypes.data.map((item: any) => [
                                    item.title || "-",
                                    item.event?.title || "-",
                                    item.createdBy?.email || item.createdBy?.firstName || "-"
                                ])}
                                empty={selectedEvent?._id ? "No resource types were returned for this event." : "Select an event context to load resource types."}
                                pagination={selectedEvent?._id ? {
                                    title: "resource types",
                                    source: resourceGroupTypes,
                                    limit: typesQuery.limit,
                                    onChange: handleTypesPaginationChange
                                } : undefined}
                            />
                        </div>
                    </TabPanel>

                    <TabPanel tabIndex={1}>
                        <div className="py-[1.5rem]">
                            <p className="mb-[0.75rem] font-uncut-semibold text-[18px] pag-950">Resource Groups</p>
                            <DataTable
                                headers={["Title", "Type", "Reserved", "Count"]}
                                rows={resourceGroups.data.map((item: any) => [
                                    item.title || "-",
                                    item.type?.title || "-",
                                    item.reserved || 0,
                                    item.count || item.available || 0
                                ])}
                                empty={selectedEvent?._id ? "No resource groups were returned for this event." : "Select an event context to load resource groups."}
                                pagination={selectedEvent?._id ? {
                                    title: "resource groups",
                                    source: resourceGroups,
                                    limit: groupsQuery.limit,
                                    onChange: handleGroupsPaginationChange
                                } : undefined}
                            />
                        </div>
                    </TabPanel>
                </Tabs>
            </CardUI>
        </div>
    );
};

export default Resources;
