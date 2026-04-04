import React, { useEffect, useState, useContext, Fragment } from "react"
import useSidebar from "../../../../hooks/useSidebar";
import useUser from "../../../../hooks/app/useUser";
import useToast from "../../../../hooks/useToast";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import Button from "../../../../components/partials/buttons/Button";
import Icon from "../../../../components/partials/icons/Icon";
import CardUI from "../../../../components/partials/ui/CardUI";
import Divider from "../../../../components/partials/Divider";
import Badge from "../../../../components/partials/badges/Badge";
import IconButton from "../../../../components/partials/buttons/IconButton";
import { Tooltip } from "react-tooltip";
import CareerItem from "./CareerItem";
import useCareer from "../../../../hooks/app/useCareer";
import Career from "../../../../models/Career.model";
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import helper from "../../../../utils/helper.util";
import useGoTo from "../../../../hooks/useGoTo";

const Careers = ({ }) => {

    useSidebar({ type: 'page', init: true })
    const { toDetailRoute } = useGoTo()
    const { careers, getCareers } = useCareer()

    useEffect(() => {

        if (helper.isEmpty(careers.data, 'array')) {
            getCareers({ limit: 9999, page: 1, order: 'desc' })
        }

    }, [])

    return (
        <>
            <PageHeader
                title = {{
                    text: "Careers on your account",
                }}
                description="Manage careers you are building in your journey"
            >
                <div className="flex items-center gap-x-[1rem]">
                    <Button
                        type="ghost"
                        size="sm"
                        className="form-button"
                        text={{
                            label: "My Growth",
                            size: 13,
                            weight: 'regular'
                        }}
                        icon={{
                            enable: true,
                            child: <Icon name="chevron-right" type="feather" size={16} className="pas-950" />
                        }}
                        onClick={(e) => toDetailRoute(e, { route: 'account', subroute: 'growth' })}
                    />
                    <Button
                        type="primary"
                        size="sm"
                        className="form-button"
                        text={{
                            label: "New Career",
                            size: 13,
                            weight: 'regular'
                        }}
                        icon={{
                            enable: true,
                            child: <Icon name="plus" type="feather" size={16} className="color-white" />
                        }}
                        reverse="row"
                        onClick={(e) => {}}
                    />
                </div>

            </PageHeader>

            <Divider show={false} />

            {
                careers.loading &&
                <>
                    {
                        Array(1).fill(null).map((_, index) =>
                            <Fragment key={index}>
                                <CareerItem loading={true} />
                                <Divider show={false} />
                            </Fragment>
                        )
                    }
                </>
            }

            {
                !careers.loading &&
                <>
                    {
                        careers.data.length === 0 &&
                        <>
                            <EmptyState className="min-h-[30vh]" noBound={true}>
                                <span className="font-mona pag-800 text-[13px]">Your careers will appear here</span>
                            </EmptyState>
                        </>
                    }

                    {
                        careers.data.length > 0 &&
                        careers.data.map((career: Career) =>
                            <Fragment key={career._id}>
                                <CareerItem loading={false} career={career} />
                                <Divider show={false} />
                            </Fragment>
                        )
                    }
                    {
                        careers.data.length < 2 &&
                        <>
                            <CardUI flat={true} noBorder={true}>
                                <div
                                    className="rounded-[10px] bdr-pag-100 drag-zone min-h-[250px] flex flex-col gap-y-[1.5rem] items-center justify-center"
                                >
                                    <div className="text-center space-y-[0.25rem]">
                                        <p className="text-[14px] font-mona pas-950">Are you building another career as you journey?</p>
                                        <p className="text-[13px] font-mona-light pag-600">Add more careers to your account and grow them with Pacitude</p>
                                    </div>

                                    <Button
                                        type="ghost"
                                        size="sm"
                                        className="form-button"
                                        text={{
                                            label: "New Career",
                                            size: 13,
                                            weight: 'regular'
                                        }}
                                        icon={{
                                            enable: true,
                                            child: <Icon name="plus" type="polio" size={16} className="pas-950" />
                                        }}
                                        reverse="row"
                                        onClick={(e) => { }}
                                    />
                                </div>
                            </CardUI>
                        </>
                    }
                </>
            }


        </>
    )
};

export default Careers;
