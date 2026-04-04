import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosService from "../../../../../services/axios.service";
import useAccommodations from "../../../../../hooks/app/useAccommodations";
import useEvents from "../../../../../hooks/app/useEvents";
import useParticipants from "../../../../../hooks/app/useParticipants";
import useResources from "../../../../../hooks/app/useResources";
import useSidebar from "../../../../../hooks/useSidebar";
import useToast from "../../../../../hooks/useToast";
import routil from "../../../../../utils/routes.util";
import storage from "../../../../../utils/storage.util";
import { IPopoutItem } from "../../../../../utils/interfaces.util";
import helper from "../../../../../utils/helper.util";

export const useParticipantListPage = () => {
    useSidebar({ type: "page", init: true });

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const [appliedKeyword, setAppliedKeyword] = useState("");
    const [query, setQuery] = useState({ limit: 30, page: 1 });
    const { selectedEvent } = useEvents();
    const { participants, getParticipants } = useParticipants();

    useEffect(() => {
        if (!selectedEvent?._id) {
            return;
        }

        getParticipants({
            limit: query.limit,
            page: query.page,
            key: appliedKeyword || undefined,
            payload: { event: selectedEvent._id }
        });
    }, [appliedKeyword, getParticipants, query, selectedEvent?._id]);

    useEffect(() => {
        setAppliedKeyword((prev) => prev ? "" : prev);
        setKeyword((prev) => prev ? "" : prev);
        setQuery((prev) => prev.page !== 1 ? { ...prev, page: 1 } : prev);
    }, [selectedEvent?._id]);

    const handlePaginationChange = async (data: any) => {
        setQuery((prev) => ({
            limit: data.limit ?? prev.limit,
            page: data.page ?? prev.page
        }));
    };

    const goToParticipantDetails = (participantId?: string) => {
        if (!participantId) {
            return;
        }

        navigate(
            routil.inRoute({
                route: "participants",
                name: "participant-details",
                params: [{ type: "url", name: "id", value: participantId }]
            })
        );
    };

    const handleSearch = () => {
        if (selectedEvent?._id) {
            setAppliedKeyword(keyword);
            setQuery((prev) => ({ ...prev, page: 1 }));
        }
    };

    const rowActions: Array<Array<IPopoutItem>> = participants.data.map((participant: any) => ([
        {
            label: "View participant details",
            value: `details-${participant._id}`,
            icon: { type: "feather", name: "eye", size: 14 },
            onClick: (e: any) => {
                e.preventDefault();
                goToParticipantDetails(participant._id);
            }
        }
    ]));

    return {
        participants,
        selectedEvent,
        keyword,
        setKeyword,
        handleSearch,
        handlePaginationChange,
        goToParticipantDetails,
        rowActions,
        query
    };
};

export const useParticipantDetailsPage = () => {
    useSidebar({ type: "page", init: true });

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { participant, loading, getParticipant } = useParticipants();
    const { accommodations, rooms, getAccommodations, getRoomsByAccommodation } = useAccommodations();
    const { resourceGroups, servicePoints, getEventResourceGroups, getServicePoints } = useResources();
    const { setToast } = useToast();
    const [copyState, setCopyState] = useState<"" | "copied">("");
    const [assigning, setAssigning] = useState(false);
    const [assigningRoom, setAssigningRoom] = useState(false);
    const [assignment, setAssignment] = useState({
        accommodationId: "",
        roomId: "",
        servicePointId: "",
        resourceGroupIds: [] as Array<string>
    });

    useEffect(() => {
        storage.keep("route.name", "participants");
    }, []);

    useEffect(() => {
        if (id) {
            getParticipant(id);
        }
    }, [getParticipant, id]);

    useEffect(() => {
        if (helper.isEmpty(participant, "object")) {
            return;
        }

        setAssignment({
            accommodationId: participant?.accomodation?._id || "",
            roomId: participant?.room?._id || "",
            servicePointId: participant?.servicePoint?._id || "",
            resourceGroupIds: (participant?.resourceGroups || []).map((group: any) => group?._id).filter(Boolean)
        });
    }, [participant]);

    useEffect(() => {
        const eventId = participant?.event?._id;

        if (!eventId) {
            return;
        }

        getEventResourceGroups({ limit: 100, page: 1, payload: { event: eventId } });
        getServicePoints(eventId);

        if (participant?.event?.category === "central") {
            getAccommodations({ limit: 100, page: 1, payload: { event: eventId } });
        }
    }, [
        getAccommodations,
        getEventResourceGroups,
        getServicePoints,
        participant?.event?._id,
        participant?.event?.category
    ]);

    useEffect(() => {
        if (!assignment.accommodationId) {
            return;
        }

        getRoomsByAccommodation({
            limit: 100,
            page: 1,
            payload: { accommodationId: assignment.accommodationId }
        });
    }, [assignment.accommodationId, getRoomsByAccommodation]);

    const fullName = useMemo(
        () => [participant?.lastName, participant?.firstName].filter(Boolean).join(" ") || "Unknown participant",
        [participant?.firstName, participant?.lastName]
    );

    const initials = useMemo(
        () => fullName.split(" ").map((name) => name.charAt(0)).filter(Boolean).slice(0, 2).join("").toUpperCase(),
        [fullName]
    );

    const resourceGroupNames = useMemo(
        () => (participant?.resourceGroups || []).map((group: any) => group?.title).filter(Boolean),
        [participant?.resourceGroups]
    );

    const isCentralEvent = participant?.event?.category === "central";
    const canAssignParticipants = useMemo(() => {
        const role = storage.fetchLegacy("role") || "";
        return ["admin", "superadmin"].includes(role);
    }, []);

    const accommodationOptions = useMemo(
        () => accommodations.data.map((item: any) => ({ label: item.title || item.name, value: item._id })),
        [accommodations.data]
    );

    const roomOptions = useMemo(
        () => rooms.data.map((item: any) => ({ label: item.title || item.name, value: item._id })),
        [rooms.data]
    );

    const servicePointOptions = useMemo(
        () => servicePoints.data.map((item: any) => ({ label: item.title || item.name, value: item._id })),
        [servicePoints.data]
    );

    const stats = [
        { label: "Attendance", value: participant?.attendanceMode || "N/A", helperText: "How the participant will attend" },
        { label: "Check-in", value: participant?.checkedIn ? "Completed" : "Pending", helperText: "Current registration desk status" },
        { label: "Resources", value: resourceGroupNames.length || 0, helperText: "Assigned resource groups" },
        { label: "Accommodation", value: participant?.accomodation?.title || "Unassigned", helperText: "Current lodging allocation" }
    ];

    const pushToast = (type: "success" | "error", message: string) => {
        setToast({
            show: true,
            type,
            title: type === "success" ? "Success" : "Error",
            message,
            position: "top-right"
        });
    };

    const onBack = (e: any) => {
        e.preventDefault();
        navigate(routil.computePath("/participants"));
    };

    const copyProfileLink = () => {
        if (!participant?.updateProfileUrl) {
            return;
        }

        storage.copyCode(participant.updateProfileUrl);
        setCopyState("copied");
        window.setTimeout(() => setCopyState(""), 2000);
    };

    const configTab = (e: any, val: number) => {
        if (e) {
            e.preventDefault();
        }

        storage.keep("participant-details-tab", val);
    };

    const defaultTabIndex = Number(storage.fetch("participant-details-tab") ?? 0);

    const toggleResourceGroup = (value: string) => {
        setAssignment((prev) => ({
            ...prev,
            resourceGroupIds: prev.resourceGroupIds.includes(value)
                ? prev.resourceGroupIds.filter((item) => item !== value)
                : [...prev.resourceGroupIds, value]
        }));
    };

    const onAccommodationChange = (value: string) => {
        setAssignment((prev) => ({
            ...prev,
            accommodationId: value,
            roomId: ""
        }));
    };

    const onRoomChange = (value: string) => {
        setAssignment((prev) => ({ ...prev, roomId: value }));
    };

    const onServicePointChange = (value: string) => {
        setAssignment((prev) => ({ ...prev, servicePointId: value }));
    };

    const handleAssignParticipant = async () => {
        if (!id) {
            return;
        }

        if (!assignment.roomId && assignment.resourceGroupIds.length === 0 && !assignment.servicePointId) {
            pushToast("error", "Select at least one assignment option before saving");
            return;
        }

        const payload: Record<string, any> = { participantId: id };

        if (assignment.roomId) {
            payload.room = assignment.roomId;
        }

        if (assignment.resourceGroupIds.length > 0) {
            payload.resourceGroups = assignment.resourceGroupIds;
        }

        if (assignment.servicePointId) {
            payload.servicePoint = assignment.servicePointId;
        }

        setAssigning(true);

        const response = await AxiosService.call({
            type: "default",
            method: "POST",
            isAuth: true,
            path: "/participants/manual-assign",
            payload
        });

        setAssigning(false);

        if (!response.error) {
            pushToast("success", response.message || "Participant assigned successfully");
            getParticipant(id);
            return;
        }

        pushToast("error", response.message || "Unable to assign participant");
    };

    const handleAssignRoom = async () => {
        if (!participant?._id) {
            return;
        }

        setAssigningRoom(true);

        const response = await AxiosService.call({
            type: "default",
            method: "POST",
            isAuth: true,
            path: `/participants/assign-to-room/${participant._id}`,
            payload: {}
        });

        setAssigningRoom(false);

        if (!response.error) {
            pushToast("success", response.message || "Participant assigned to room successfully");
            if (id) {
                getParticipant(id);
            }
            return;
        }

        pushToast("error", response.message || "Unable to auto assign participant to room");
    };

    return {
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
    };
};
