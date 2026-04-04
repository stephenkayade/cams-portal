import React, { ChangeEvent } from "react";
import Button from "../../../../../components/partials/buttons/Button";

interface IEventSelector {
    events: Array<any>;
    selectedEvent?: Record<string, any>;
    onChange(event: Record<string, any>): void;
    onRefresh?(): void;
}

const EventSelector = ({ events, selectedEvent, onChange, onRefresh }: IEventSelector) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const event = events.find((item) => item._id === e.target.value);
        if (event) {
            onChange(event);
        }
    };

    return (
        <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem]">
            <div className="flex flex-wrap items-center gap-[0.75rem]">
                <div className="min-w-[240px] grow">
                    <p className="font-mona-medium text-[12px] uppercase tracking-[0.08em] pag-500">Active Event</p>
                    <select
                        value={selectedEvent?._id || ""}
                        onChange={handleChange}
                        className="mt-[0.55rem] h-[44px] w-fit rounded-[10px] border bdr-pag-200 px-[0.9rem] font-mona text-[14px] pag-900 outline-none"
                    >
                        <option value="">Choose an event</option>
                        {events.map((event) => (
                            <option key={event._id} value={event._id}>
                                {event.title || event.name || "Untitled Event"}
                            </option>
                        ))}
                    </select>
                </div>

                {onRefresh && (
                    <Button
                        type="ghost"
                        semantic="normal"
                        size="sm"
                        text={{ label: "Refresh Events", size: 13 }}
                        onClick={() => onRefresh()}
                    />
                )}
            </div>
        </div>
    );
};

export default EventSelector;
