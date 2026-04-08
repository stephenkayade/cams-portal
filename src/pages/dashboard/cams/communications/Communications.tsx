import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import Button from "../../../../components/partials/buttons/Button";
import TextAreaInput from "../../../../components/partials/inputs/TextAreaInput";
import TextInput from "../../../../components/partials/inputs/TextInput";
import useSidebar from "../../../../hooks/useSidebar";
import useEvents from "../../../../hooks/app/useEvents";
import useParticipants from "../../../../hooks/app/useParticipants";
import useCommunications from "../../../../hooks/app/useCommunications";
import useToast from "../../../../hooks/useToast";

const Communications = () => {
    useSidebar({ type: "page", init: true });

    const [mailSubject, setMailSubject] = useState("");
    const [mailBody, setMailBody] = useState("");
    const [smsBody, setSmsBody] = useState("");
    const [sending, setSending] = useState<"mail" | "sms" | "">("");

    const { selectedEvent } = useEvents();
    const { participants, getParticipants } = useParticipants();
    const { sendMail, sendSms } = useCommunications();
    const { setToast } = useToast();

    useEffect(() => {
        if (!selectedEvent?._id) {
            return;
        }

        getParticipants({ limit: 50, page: 1, payload: { event: selectedEvent._id } });
    }, [getParticipants, selectedEvent?._id]);

    const participantIds = useMemo(() => participants.data.map((item: any) => item._id).filter(Boolean), [participants.data]);

    const previewRecipients = useMemo(() => participants.data.slice(0, 8), [participants.data]);

    const pushToast = (type: "success" | "error", message: string) => {
        setToast({
            show: true,
            type,
            title: type === "success" ? "Success" : "Error",
            message,
            position: "top-right"
        });
    };

    return (
        <div className="space-y-[1rem]">
            <PageHeader
                title={{ text: "CAMS Communications", font: "uncut", weight: "semibold" }}
                description={selectedEvent?.title ? `Bulk communication for ${selectedEvent.title}.` : "Select an event context to message participants."}
            />

            <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                <p className="font-uncut-semibold text-[18px] pag-950">Recipients</p>
                <div className="mt-[0.75rem] flex flex-wrap gap-[0.5rem]">
                    {previewRecipients.map((participant: any) => (
                        <span key={participant._id} className="rounded-[999px] bg-pab-50 px-[0.75rem] py-[0.35rem] font-mona text-[12px] pab-900">
                            {participant.email || participant.phone || participant._id}
                        </span>
                    ))}
                    {participants.data.length > previewRecipients.length && (
                        <span className="rounded-[999px] bg-pag-50 px-[0.75rem] py-[0.35rem] font-mona text-[12px] pag-700">
                            +{participants.data.length - previewRecipients.length} more
                        </span>
                    )}
                </div>
            </div>

            <div className="grid gap-[1rem] lg:grid-cols-2">
                <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                    <p className="font-uncut-semibold text-[18px] pag-950">Email</p>
                    <div className="mt-[1rem] space-y-[0.85rem]">
                        <TextInput
                            type="text"
                            placeholder="Message subject"
                            onChange={(e) => setMailSubject(e.target.value)}
                        />
                        <TextAreaInput
                            placeholder="Write the email body"
                            rows={8}
                            onChange={(e) => setMailBody(e.target.value)}
                        />
                        <Button
                            loading={sending === "mail"}
                            disabled={!selectedEvent?._id || participantIds.length === 0 || !mailSubject || !mailBody}
                            type="primary"
                            semantic="blue"
                            size="sm"
                            text={{ label: "Send Email", size: 13 }}
                            onClick={async () => {
                                setSending("mail");
                                const response = await sendMail({ mailSubject, mailBody, participants: participantIds });
                                setSending("");
                                if (!response.error) {
                                    pushToast("success", response.message || "Email sent successfully");
                                    return;
                                }
                                pushToast("error", response.message || "Unable to send email");
                            }}
                        />
                    </div>
                </div>

                <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
                    <p className="font-uncut-semibold text-[18px] pag-950">SMS</p>
                    <div className="mt-[1rem] space-y-[0.85rem]">
                        <TextAreaInput
                            placeholder="Write the SMS body"
                            rows={10}
                            onChange={(e) => setSmsBody(e.target.value)}
                        />
                        <Button
                            loading={sending === "sms"}
                            disabled={!selectedEvent?._id || participantIds.length === 0 || !smsBody}
                            type="primary"
                            semantic="blue"
                            size="sm"
                            text={{ label: "Send SMS", size: 13 }}
                            onClick={async () => {
                                setSending("sms");
                                const response = await sendSms({ smsBody, participants: participantIds });
                                setSending("");
                                if (!response.error) {
                                    pushToast("success", response.message || "SMS sent successfully");
                                    return;
                                }
                                pushToast("error", response.message || "Unable to send SMS");
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Communications;
