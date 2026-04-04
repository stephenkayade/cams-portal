import React, { useEffect, useState, useContext } from "react"
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import useSidebar from "../../../../hooks/useSidebar";

const GrowthPage = ({ }) => {

    useSidebar({ type: 'page', init: true })

    useEffect(() => {

    }, [])

    return (
        <>
            <EmptyState className="min-h-[50vh] mb-[1rem] full-bg" noBound={true} style={{ backgroundImage: `url("../../../images/assets/bg@grad_01.webp")` }}>
                <span className="font-mona pag-800 text-[15px]">We're working on your career growth page. Check back!</span>
            </EmptyState>
        </>
    )
};

export default GrowthPage;
