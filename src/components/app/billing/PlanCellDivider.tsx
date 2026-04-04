import React, { Fragment, useEffect, useState } from "react"

interface IPlanCellDivider {
    text: string
}

const PlanCellDivider = (props: IPlanCellDivider) => {

    const {
        text
    } = props;

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="col-span-1 px-6 py-4 border-b bdr-pag-100 pag-800 font-mona-medium text-[15px]"></div>
            <div className="col-span-1 p-4 border-b bdr-pag-100 flex justify-center items-center">
                <span className="font-mona-medium pas-900">{ text }</span>
            </div>
            <div className="col-span-1 p-4 border-b bdr-pag-100 flex justify-center items-center"></div>

        </>
    )
};

export default PlanCellDivider;
