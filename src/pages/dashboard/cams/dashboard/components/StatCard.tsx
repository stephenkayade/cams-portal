import React from "react";

interface IStatCard {
    label: string;
    value: string | number;
    helper?: string;
}

const StatCard = ({ label, value, helper = "" }: IStatCard) => {
    return (
        <div className="rounded-[14px] border bdr-pag-100 bg-white px-[1rem] py-[1rem] shadow-sm">
            <p className="font-mona-medium text-[12px] uppercase tracking-[0.08em] pag-500">{label}</p>
            <h3 className="mt-[0.5rem] font-uncut-semibold text-[28px] pag-950">{value}</h3>
            <p className="mt-[0.35rem] font-mona-light text-[12px] pag-500">{helper}</p>
        </div>
    );
};

export default StatCard;
