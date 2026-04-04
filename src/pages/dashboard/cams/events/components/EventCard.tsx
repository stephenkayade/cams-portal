import React from "react";
import CardUI from "../../../../../components/partials/ui/CardUI";
import Badge from "../../../../../components/partials/badges/Badge";
import Button from "../../../../../components/partials/buttons/Button";
import Popout from "../../../../../components/partials/drops/Popout";
import helper from "../../../../../utils/helper.util";
import { IPopoutItem } from "../../../../../utils/interfaces.util";

interface IEventCard {
    event: Record<string, any>;
    selected: boolean;
    onSelect(): void;
    actions?: Array<IPopoutItem>;
}

const EventCard = ({ event, selected, onSelect, actions = [] }: IEventCard) => {
    const backgroundImage = event.flier_url || event.banner || event.image || "";
    const title = event.title || "Untitled Event";
    const description = event.description || "";
    const category = event.category || event.type || "Event";
    const startDate = event.start_date || event.startDate || event.date;
    const endDate = event.end_date || event.endDate;
    const startTime = event.start_time || event.startTime || "";
    const endTime = event.end_time || event.endTime || "";
    const venue = event.location || event.venue || "Location TBD";

    return (
        <CardUI flat={true} className="overflow-hidden h-full">
            <div className="flex h-full flex-col">
                <div
                    className={`relative flex min-h-[116px] items-start px-[1rem] py-[1rem] ${backgroundImage ? "" : "bg-pag-50"}`}
                    style={{
                        backgroundImage: backgroundImage ? `linear-gradient(180deg, rgba(13,18,45,0.15), rgba(13,18,45,0.72)), url('${backgroundImage}')` : "linear-gradient(135deg, #e7eefc 0%, #d8e8ff 45%, #f5f8ff 100%)",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }}
                >
                    <Badge
                        type="info"
                        size="sm"
                        display="badge"
                        label={category}
                        padding={{ y: 4, x: 10 }}
                        font={{ weight: "regular", size: 10 }}
                        upper={true}
                        close={false}
                    />

                    {actions.length > 0 && (
                        <div className="ml-auto">
                            <Popout
                                position="bottom-right"
                                noFilter={false}
                                menu={{
                                    search: false,
                                    className: "min-w-[11rem]",
                                    fullWidth: false,
                                    limitHeight: "sm"
                                }}
                                items={actions}
                            />
                        </div>
                    )}
                </div>

                <div className="flex grow flex-col bg-white px-[1rem] py-[1rem]">
                    <div className="space-y-[0.3rem]">
                        <div className="">
                            <h3 className="line-clamp-1 font-mona-medium text-[15px] pag-900">{title}</h3>
                        </div>

                        <div className="min-h-[38px]">
                            <p className="line-clamp-2 font-mona-light text-[13px] pag-600">
                                {description || "No event summary was provided for this event yet."}
                            </p>
                        </div>

                        <div className="flex items-end justify-between gap-x-[0.75rem]">
                            <div className="flex flex-col">
                                <span className="font-mona-medium text-[10px] uppercase tracking-wider pag-700">Starts</span>
                                <span className="font-mona-light text-[11px] pag-600">
                                    {startDate ? helper.formatDate(startDate, "basic-month") : "Date pending"} {startTime}
                                </span>
                            </div>

                            <div className="grow border-t bdr-pag-100 mb-[7px]"></div>

                            <div className="flex flex-col text-right">
                                <span className="font-mona-medium text-[10px] uppercase tracking-wider pag-700">Ends</span>
                                <span className="font-mona-light text-[11px] pag-600">
                                    {endDate ? helper.formatDate(endDate, "basic-month") : "Date pending"} {endTime}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-[0.5rem] border-t bdr-pag-100 pt-[0.7rem]">
                            <span className="font-mona-medium text-[12px] pag-700">Venue:</span>
                            <span className="truncate font-mona-light text-[12px] pag-600">{venue}</span>
                        </div>
                    </div>

                    <div className="mt-[1rem] flex items-center justify-between gap-[0.6rem] w-full">
                        <Button
                            type={selected ? "secondary" : "ghost"}
                            semantic={selected ? "normal" : "default"}
                            size="xsm"
                            fill={!selected}
                            text={{
                                label: selected ? "Selected" : "Use Event",
                                size: 12,
                                weight: "regular"
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                onSelect();
                            }}
                        />

                        {selected && (
                            <span className="ml-10 font-mona text-[12px] pagr-700">Selected for participants, accommodations, and resources.</span>
                        )}
                    </div>
                </div>
            </div>
        </CardUI>
    );
};

export default EventCard;
