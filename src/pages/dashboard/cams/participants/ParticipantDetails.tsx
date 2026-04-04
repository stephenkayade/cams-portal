import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Badge from "../../../../components/partials/badges/Badge";
import Button from "../../../../components/partials/buttons/Button";
import CardUI from "../../../../components/partials/ui/CardUI";
import Divider from "../../../../components/partials/Divider";
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import Filter from "../../../../components/partials/drops/Filter";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import helper from "../../../../utils/helper.util";
import { useParticipantDetailsPage } from "./hooks/useParticipant";

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="rounded-[7px] border bdr-pag-100 bg-pag-25 px-[0.9rem] py-[0.85rem]">
        <p className="font-mona-medium text-[11px] uppercase tracking-[0.08em] pag-500">{label}</p>
        <div className="mt-[0.35rem] font-mona text-[14px] pag-900">{value}</div>
    </div>
);

const ParticipantDetailsPage = () => {
    const {
        participant,
        resourceGroups,
        loading,
        copyState,
        assigning,
        assigningRoom,
        assignment,
        fullName,
        initials,
        resourceGroupNames,
        isCentralEvent,
        canAssignParticipants,
        accommodationOptions,
        roomOptions,
        servicePointOptions,
        stats,
        defaultTabIndex,
        onBack,
        copyProfileLink,
        configTab,
        toggleResourceGroup,
        onAccommodationChange,
        onRoomChange,
        onServicePointChange,
        handleAssignParticipant,
        handleAssignRoom
    } = useParticipantDetailsPage();

    return (
        <section className="space-y-[1rem]">
            <PageHeader
                title={{ text: "Participant details", font: "uncut", weight: "semibold" }}
                description="Modernized CAMS participant profile, using the latest portal detail-page layout."
            >
                <div className="flex items-center gap-[0.6rem]">
                    <Button
                        type="ghost"
                        semantic="default"
                        size="xxsm"
                        text={{ label: "Back to participants", size: 12 }}
                        onClick={onBack}
                    />
                </div>
            </PageHeader>

            {loading && (
                <EmptyState className="min-h-[50vh]" noBound={true}>
                    <span className="loader lg primary"></span>
                    <span className="font-mona text-[16px] pas-950">Fetching participant data</span>
                </EmptyState>
            )}

            {!loading && helper.isEmpty(participant, "object") && (
                <EmptyState className="min-h-[50vh]" noBound={true}>
                    <span className="font-mona text-[14px] pas-950">Participant details not found.</span>
                </EmptyState>
            )}

            {!loading && !helper.isEmpty(participant, "object") && (
                <>
                    <CardUI>
                        <div className="overflow-hidden rounded-[18px] border bdr-pag-100 bg-[linear-gradient(135deg,#eff5ff_0%,#ffffff_48%,#eef9f5_100%)]">
                            <div className="grid gap-[1.25rem] px-[1.15rem] py-[1.15rem] lg:grid-cols-[140px_1fr] lg:px-[1.4rem] lg:py-[1.4rem]">
                                <div className="flex h-[112px] w-[112px] items-center justify-center rounded-[22px] bg-pacb-100 font-uncut-semibold text-[34px] pacb-900 shadow">
                                    {initials || "P"}
                                </div>

                                <div className="space-y-[0.85rem]">
                                    <div className="flex flex-wrap items-start gap-[0.8rem]">
                                        <div className="space-y-[0.35rem]">
                                            <h3 className="font-uncut-semibold text-[24px] pag-950">{fullName}</h3>
                                            <div className="flex flex-wrap items-center gap-[0.6rem] font-mona text-[13px] pag-600">
                                                <span>{participant?.email || "No email provided"}</span>
                                                <span className="pag-300">|</span>
                                                <span>{participant?.phone || "No phone provided"}</span>
                                            </div>
                                        </div>

                                        <div className="ml-auto flex flex-wrap items-center gap-[0.5rem]">
                                            <Badge
                                                type={participant?.checkedIn ? "success" : "warning"}
                                                size="sm"
                                                display="status"
                                                label={participant?.checkedIn ? "Checked In" : "Pending Check-in"}
                                                upper={false}
                                                close={false}
                                            />
                                            <Badge
                                                type="info"
                                                size="sm"
                                                display="badge"
                                                label={participant?.attendanceMode || "Attendance N/A"}
                                                upper={true}
                                                close={false}
                                            />
                                        </div>
                                    </div>

                                    <Divider />

                                    <div className="grid gap-[0.8rem] md:grid-cols-2 xl:grid-cols-4">
                                        <DetailItem label="Event" value={participant?.event?.title || "N/A"} />
                                        <DetailItem label="Center" value={participant?.center?.title || participant?.center?.name || "N/A"} />
                                        <DetailItem label="Gender" value={participant?.gender ? helper.capitalize(participant.gender) : "N/A"} />
                                        <DetailItem label="Marital Status" value={participant?.maritalStatus ? helper.capitalize(participant.maritalStatus) : "N/A"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardUI>

                    <CardUI>
                        <div className="grid gap-[1rem] md:grid-cols-2 xl:grid-cols-4">
                            {stats.map((item) => (
                                <div key={item.label} className="rounded-[7px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                                    <p className="font-mona-medium text-[12px] uppercase tracking-[0.08em] pag-500">{item.label}</p>
                                    <h3 className="mt-[0.5rem] font-uncut-semibold text-[24px] pag-950">{item.value}</h3>
                                    <p className="mt-[0.35rem] font-mona-light text-[12px] pag-500">{item.helperText}</p>
                                </div>
                            ))}
                        </div>
                    </CardUI>

                    <CardUI>
                        <Tabs defaultIndex={defaultTabIndex}>
                            <TabList>
                                <Tab onClick={(e: any) => { configTab(e, 0); }}>Details</Tab>
                                {canAssignParticipants && (
                                    <Tab onClick={(e: any) => { configTab(e, 1); }}>Assign participant</Tab>
                                )}
                            </TabList>

                            <TabPanel tabIndex={0}>
                                <div className="py-[1.5rem]">
                                    <div className="grid gap-[1rem] xl:grid-cols-[1.15fr_0.85fr]">
                                        <CardUI>
                                            <div className="space-y-[1rem]">
                                                <div>
                                                    <h3 className="font-uncut-semibold text-[20px] pag-950">Personal information</h3>
                                                    <p className="mt-[0.25rem] font-mona-light text-[13px] pag-500">Core participant identity and registration details from CAMS.</p>
                                                </div>

                                                <div className="grid gap-[0.8rem] md:grid-cols-2">
                                                    <DetailItem label="First Name" value={participant?.firstName || "N/A"} />
                                                    <DetailItem label="Last Name" value={participant?.lastName || "N/A"} />
                                                    <DetailItem label="Email Address" value={participant?.email || "N/A"} />
                                                    <DetailItem label="Phone Number" value={participant?.phone || "N/A"} />
                                                    <DetailItem label="Country" value={participant?.country || "N/A"} />
                                                    <DetailItem label="State" value={participant?.state || "N/A"} />
                                                    <DetailItem label="Age Group" value={participant?.ageGroup ? helper.capitalize(participant.ageGroup) : "N/A"} />
                                                    <DetailItem label="Occupation Group" value={participant?.occupationGroup ? helper.capitalize(participant.occupationGroup) : "N/A"} />
                                                </div>

                                                <DetailItem label="Address" value={participant?.address || "N/A"} />
                                            </div>
                                        </CardUI>

                                        <div className="space-y-[1rem]">
                                            <CardUI>
                                                <div className="space-y-[1rem]">
                                                    <div>
                                                        <h3 className="font-uncut-semibold text-[20px] pag-950">Assignments</h3>
                                                        <p className="mt-[0.25rem] font-mona-light text-[13px] pag-500">Accommodation, rooming, service point, and resource access mapped from CAMS.</p>
                                                    </div>

                                                    <div className="grid gap-[0.8rem]">
                                                        <DetailItem label="Accommodation" value={participant?.accomodation?.title || "N/A"} />
                                                        <DetailItem label="Room" value={participant?.room?.title || "N/A"} />
                                                        <DetailItem label="Service Point" value={participant?.servicePoint?.title || "N/A"} />
                                                        <DetailItem
                                                            label="Resource Groups"
                                                            value={
                                                                resourceGroupNames.length > 0 ? (
                                                                    <div className="flex flex-wrap gap-[0.4rem]">
                                                                        {resourceGroupNames.map((name:any) => (
                                                                            <span key={name} className="rounded-[999px] bg-pacb-50 px-[0.7rem] py-[0.35rem] font-mona-medium text-[12px] pacb-900">
                                                                                {name}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                ) : "N/A"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </CardUI>

                                            <CardUI>
                                                <div className="space-y-[1rem]">
                                                    <div>
                                                        <h3 className="font-uncut-semibold text-[20px] pag-950">Registration timeline</h3>
                                                        <p className="mt-[0.25rem] font-mona-light text-[13px] pag-500">Useful activity context around this participant record.</p>
                                                    </div>

                                                    <div className="grid gap-[0.8rem]">
                                                        <DetailItem label="Created On" value={participant?.createdAt ? helper.formatDate(participant.createdAt, "basic-month") : "N/A"} />
                                                        <DetailItem label="Updated On" value={participant?.updatedAt ? helper.formatDate(participant.updatedAt, "basic-month") : "N/A"} />
                                                        <DetailItem label="Participant ID" value={participant?._id || "N/A"} />
                                                        <DetailItem label="Update Profile Link" value={participant?.updateProfileUrl || "N/A"} />
                                                    </div>

                                                    {participant?.updateProfileUrl && (
                                                        <div className="flex flex-wrap items-center gap-[0.65rem]">
                                                            <Button
                                                                type="ghost"
                                                                semantic="default"
                                                                size="xxsm"
                                                                text={{ label: copyState === "copied" ? "Copied" : "Copy profile link", size: 12 }}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    copyProfileLink();
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </CardUI>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                            {canAssignParticipants && (
                                <TabPanel tabIndex={1}>
                                    <div className="py-[1.5rem]">
                                        <div className="space-y-[1rem]">
                                            <div className="flex flex-wrap items-start gap-[0.75rem]">
                                                <div>
                                                    <h3 className="font-uncut-semibold text-[20px] pag-950">Assign participant</h3>
                                                    <p className="mt-[0.25rem] font-mona-light text-[13px] pag-500">Admin tools based on the legacy CAMS participant assignment flow, rebuilt with the portal UI.</p>
                                                </div>

                                                {isCentralEvent && (
                                                    <div className="ml-auto">
                                                        <Button
                                                            loading={assigningRoom}
                                                            type="ghost"
                                                            semantic="default"
                                                            size="xxsm"
                                                            text={{ label: "Assign to room", size: 12 }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleAssignRoom();
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <Divider />

                                            <div className="grid gap-[1rem] lg:grid-cols-2">
                                                {isCentralEvent && (
                                                    <div className="space-y-[0.6rem]">
                                                        <p className="font-mona-medium text-[12px] uppercase tracking-[0.08em] pag-500">Accommodation</p>
                                                        <Filter
                                                            size="rg"
                                                            placeholder="Select hostel"
                                                            position="bottom"
                                                            defaultValue={assignment.accommodationId}
                                                            menu={{ style: {}, search: true, fullWidth: true, limitHeight: "sm" }}
                                                            items={accommodationOptions}
                                                            noFilter={false}
                                                            onChange={(data) => onAccommodationChange(data.value)}
                                                        />
                                                    </div>
                                                )}

                                                {isCentralEvent && (
                                                    <div className="space-y-[0.6rem]">
                                                        <p className="font-mona-medium text-[12px] uppercase tracking-[0.08em] pag-500">Room</p>
                                                        <Filter
                                                            size="rg"
                                                            placeholder="Select room"
                                                            position="bottom"
                                                            defaultValue={assignment.roomId}
                                                            menu={{ style: {}, search: true, fullWidth: true, limitHeight: "sm" }}
                                                            items={roomOptions}
                                                            noFilter={false}
                                                            onChange={(data) => onRoomChange(data.value)}
                                                        />
                                                    </div>
                                                )}

                                                <div className="space-y-[0.6rem] lg:col-span-2">
                                                    <p className="font-mona-medium text-[12px] uppercase tracking-[0.08em] pag-500">Resource Groups</p>
                                                    <div className="grid gap-[0.75rem] md:grid-cols-2 xl:grid-cols-3">
                                                        {resourceGroups.data.length > 0 ? resourceGroups.data.map((group: any) => {
                                                            const checked = assignment.resourceGroupIds.includes(group._id);
                                                            return (
                                                                <label
                                                                    key={group._id}
                                                                    className={`flex cursor-pointer items-start gap-[0.75rem] rounded-[12px] border px-[0.9rem] py-[0.85rem] transition-colors ${checked ? "bdr-pacb-400 bg-pacb-25" : "bdr-pag-100 bg-white"}`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={checked}
                                                                        onChange={() => toggleResourceGroup(group._id)}
                                                                        className="mt-[0.15rem] h-[16px] w-[16px]"
                                                                    />
                                                                    <div>
                                                                        <p className="font-mona-medium text-[13px] pag-900">{group.title || "Untitled group"}</p>
                                                                        <p className="mt-[0.15rem] font-mona-light text-[12px] pag-500">{group.type?.title || "Resource group"}</p>
                                                                    </div>
                                                                </label>
                                                            );
                                                        }) : (
                                                            <div className="rounded-[12px] border bdr-pag-100 bg-pag-25 px-[0.9rem] py-[0.85rem] font-mona-light text-[13px] pag-500">
                                                                No resource groups are available for this event yet.
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-[0.6rem] lg:col-span-2">
                                                    <p className="font-mona-medium text-[12px] uppercase tracking-[0.08em] pag-500">Service Point</p>
                                                    <Filter
                                                        size="rg"
                                                        placeholder="Select service point"
                                                        position="bottom"
                                                        defaultValue={assignment.servicePointId}
                                                        menu={{ style: {}, search: true, fullWidth: true, limitHeight: "sm" }}
                                                        items={servicePointOptions}
                                                        noFilter={false}
                                                        onChange={(data) => onServicePointChange(data.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end">
                                                <Button
                                                    loading={assigning}
                                                    type="primary"
                                                    semantic="blue"
                                                    size="xxsm"
                                                    text={{ label: "Save assignment", size: 12 }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAssignParticipant();
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            )}
                        </Tabs>
                    </CardUI>
                </>
            )}
        </section>
    );
};

export default ParticipantDetailsPage;
