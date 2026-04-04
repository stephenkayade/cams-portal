import React, { useEffect, useState, useContext } from "react"
import EmptyState from "../../../components/partials/dialogs/EmptyState";
import useSidebar from "../../../hooks/useSidebar";

const NotificationSettingsPage = ({ }) => {

    useSidebar({ type: 'page', init: true })

    useEffect(() => {

    }, [])

    return (
        <>
            <EmptyState className="min-h-[50vh] mb-[1rem] full-bg" noBound={true} style={{ backgroundImage: `url("../../../images/assets/bg@grad_01.webp")` }}>
                <span className="font-mona pag-800 text-[15px]">We're working on your notification settings. Check back!</span>
            </EmptyState>
        </>
    )
};

export default NotificationSettingsPage;
