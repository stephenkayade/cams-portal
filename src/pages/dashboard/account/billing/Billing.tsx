import React, { useEffect, useState, useContext, Fragment } from "react"
import { useSearchParams } from 'react-router-dom'
import useSidebar from "../../../../hooks/useSidebar";
import useUser from "../../../../hooks/app/useUser";
import PageHeader from "../../../../components/partials/ui/PageHeader";
import Button from "../../../../components/partials/buttons/Button";
import Icon from "../../../../components/partials/icons/Icon";
import CardUI from "../../../../components/partials/ui/CardUI";
import Divider from "../../../../components/partials/Divider";
import Badge from "../../../../components/partials/badges/Badge";
import LinkButton from "../../../../components/partials/buttons/LinkButton";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import storage from "../../../../utils/storage.util";
import { CurrencySymbol, CurrencyType, PlanNameEnum, StatusEnum } from "../../../../utils/enums.util";
import helper from "../../../../utils/helper.util";
import Placeholder from "../../../../components/partials/Placeholder";
import CardLoading from "../../../../components/app/loaders/CardLoading";
import PlanModal from "../../../../components/app/billing/PlanModal";
import useGoTo from "../../../../hooks/useGoTo";
import VerifyModal from "../../../../components/app/VerifyModal";
import RenewModal from "../../../../components/app/RenewModal";
import EmptyState from "../../../../components/partials/dialogs/EmptyState";
import { IPlanFeature } from "../../../../models/Plan.model";
import FeatureCard from "../../../../components/app/billing/FeatureCard";
import useWorkspace from "../../../../hooks/app/useWorkspace";

const BillingPage = ({ }) => {

    useSidebar({ type: 'page', init: true })
    const { subscription, plan, loading, displayAmount } = useUser();
    const { toDetailRoute } = useGoTo();
    const { revealByWorkspace } = useWorkspace();

    const [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = useState<boolean>(false);
    const [showVerify, setShowVerify] = useState<boolean>(false);
    const [showRenew, setShowRenew] = useState<boolean>(false);
    const [addonFeatures, setAddOnFeatures] = useState<Array<IPlanFeature>>([])
    const [features, setFeatures] = useState<Array<IPlanFeature>>([])

    const reference = searchParams.get('reference')

    useEffect(() => {

        if (reference) {
            toggleVerify(null)
        }

    }, [])

    useEffect(() => {

        if (subscription && subscription.features && subscription.features.length > 0) {
            setFeatures(plan.features.filter((ft) => ft.category === 'base' && ft.status === StatusEnum.ACTIVE))
            setAddOnFeatures(plan.features.filter((ft) => ft.category === 'addon'))
        }

    }, [subscription])

    const configTab = (e: any, val: any) => {
        if (e) { e.preventDefault(); }
        storage.keep('billing-tab', val.toString())
    }

    const toggleShow = (e: any) => {
        if (e) { e.preventDefault() }
        setShow(!show)
    }

    const toggleVerify = (e: any) => {
        if (e) { e.preventDefault() }
        setShowVerify(!showVerify)
    }

    const toggleRenew = (e: any) => {
        if (e) { e.preventDefault() }
        setShowRenew(!showRenew)
    }

    return (
        <>
            <PageHeader
                title={{
                    text: "Payments and Subscription",
                }}
                description="Manage your subscription and payments"
            >
                <div className="flex items-center gap-x-[1rem]">
                    <Button
                        type="ghost"
                        size="sm"
                        className="form-button"
                        text={{
                            label: "Change Plan",
                            size: 13,
                            weight: 'regular'
                        }}
                        icon={{
                            enable: true,
                            child: <Icon name="chevron-right" type="feather" size={16} className="pas-950" />
                        }}
                        onClick={(e) => toDetailRoute(e, { route: 'account', name: 'subscribe' })}
                    />
                </div>

            </PageHeader>

            <Divider show={false} />

            {
                loading &&
                <CardLoading type="billling" size={1} />
            }

            {
                !loading &&
                !helper.isEmpty(subscription, 'object') &&
                !helper.isEmpty(plan, 'object') &&
                <>
                    <CardUI>
                        <div className="flex min-h-[70px] pt-[0.65rem] pb-[2.5rem] px-[0.5rem] relative">

                            <div className="grow space-y-[1rem]">

                                <div className="flex">

                                    <div className="space-y-[0.8rem]">
                                        <div className="flex items-center gap-x-[1.2rem]">
                                            <h3 className="font-mona-medium pas-950 text-[14px]">Subscription</h3>
                                            <Badge
                                                type={subscription.status === StatusEnum.ACTIVE ? 'success' : 'error'}
                                                size="sm"
                                                display="status"
                                                label={helper.capitalize(subscription.status)}
                                                padding={{ y: 3, x: 12 }}
                                                font={{
                                                    weight: 'regular',
                                                    size: 10
                                                }}
                                                upper={true}
                                                close={false}
                                            />
                                        </div>
                                        <p className="font-mona text-[13px] pag-500 mb-[1rem]">Subscription is recurring {subscription.billing.frequency}</p>
                                    </div>

                                    <div className="ml-auto">
                                        <h1 className="text-center">
                                            <span className="font-mona pag-800 text-[15px]">{subscription.currency === CurrencyType.NGN ? CurrencySymbol.NGN : CurrencySymbol.USD}</span>
                                            <span className="font-mona-bold pab-900 text-[3rem] leading-tight">{displayAmount(subscription.billing.amount)}</span>
                                        </h1>
                                    </div>

                                </div>

                                <div className="w-full space-y-[0rem]">

                                    <div className="flex items-center gap-x-[2rem]">
                                        <h3 className="font-mona pag-700 text-[13px]">Last Payment:</h3>
                                        <h3 className="font-mona pag-700 text-[13px]">{helper.formatDate(subscription.billing.paidAt, 'basic')}</h3>
                                    </div>

                                    <Divider />

                                    <div className="flex items-center gap-x-[2rem]">
                                        <h3 className="font-mona pag-700 text-[13px]">Next Payment:</h3>
                                        <h3 className="font-mona pag-700 text-[13px]">{helper.formatDate(subscription.billing.dueAt, 'basic')}</h3>
                                    </div>

                                </div>

                            </div>

                            <div className="h-[180px] w-[1px] mx-[4%] bg-pag-50"></div>

                            <div className="grow space-y-[0rem]">

                                <div className="flex items-center gap-x-[1.2rem]">
                                    <h3 className="font-mona-medium pas-950 text-[14px]">Current Plan</h3>
                                    <Badge
                                        type={'info'}
                                        size="sm"
                                        display="status"
                                        label={`${plan.name} Plan`}
                                        padding={{ y: 3, x: 12 }}
                                        font={{
                                            weight: 'regular',
                                            size: 10
                                        }}
                                        upper={true}
                                        close={false}
                                    />
                                </div>

                                <Divider show={false} padding={{ enable: true, top: 'pt-[0.5rem]', bottom: 'pb-[0.5rem]' }} />

                                <div className="w-full space-y-[0rem]">

                                    <div className="flex items-center gap-x-[2rem]">
                                        <h3 className="font-mona pag-700 text-[13px]">Debit Card:</h3>
                                        <h3 className="font-mona pag-700 text-[13px]">{subscription.card.cardPan ? subscription.card.cardPan : 'Not Set'}</h3>
                                    </div>

                                    <Divider show={false} padding={{ enable: true, top: 'pt-[1rem]', bottom: 'pb-[0.5rem]' }} />

                                    <div className="flex items-center gap-x-[3rem]">
                                        <LinkButton
                                            text={{
                                                label: 'Plan Details',
                                                className: 'text-[12px]',
                                                weight: 'medium',
                                                color: 'pacb-500'
                                            }}
                                            disabled={false}
                                            loading={false}
                                            icon={{
                                                enable: true,
                                                child: <Icon name="nav-arrow-right" type="polio" size={16} className="relative top-[0.1rem] pacb-500" />
                                            }}
                                            onClick={(e) => toggleShow(e)}
                                        />
                                        <LinkButton
                                            text={{
                                                label: 'Change Plan',
                                                className: 'text-[12px]',
                                                weight: 'medium',
                                                color: 'pacb-500'
                                            }}
                                            disabled={false}
                                            loading={false}
                                            icon={{
                                                enable: true,
                                                child: <Icon name="nav-arrow-right" type="polio" size={16} className="relative top-[0.1rem] pacb-500" />
                                            }}
                                            onClick={(e) => toDetailRoute(e, { route: 'account', name: 'subscribe' })}
                                        />

                                    </div>

                                    <Divider />

                                    <div className="flex items-center gap-x-[1rem]">

                                        <Button
                                            type="primary"
                                            semantic={plan.label === PlanNameEnum.STARTER ? 'purple' : 'info'}
                                            size="xsm"
                                            loading={false}
                                            disabled={false}
                                            block={false}
                                            className="form-button min-w-[100px]"
                                            icon={{
                                                enable: true,
                                                child: <Icon name="arrow-right" type="polio" size={16} />
                                            }}
                                            text={{
                                                label: plan.label === PlanNameEnum.STARTER ? 'Upgrade Plan' : 'Renew Subscription',
                                                size: 12,
                                                weight: 'medium'
                                            }}
                                            onClick={(e) => {
                                                if (plan.label === PlanNameEnum.STARTER) {
                                                    toDetailRoute(e, { route: 'account', name: 'subscribe' })
                                                } else {
                                                    toggleRenew(e)
                                                }
                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>
                    </CardUI>

                    <Divider show={false} />

                    <CardUI>
                        <Tabs defaultIndex={parseInt(storage.fetch('billing-tab'))}>
                            <TabList>
                                <Tab onClick={(e: any) => { configTab(e, 0); }}>Features</Tab>
                                <Tab onClick={(e: any) => { configTab(e, 1); }}>History</Tab>
                            </TabList>

                            <TabPanel tabIndex={0}>

                                <div className="py-[1.5rem]">

                                    <div className="grid grid-cols-[49%_49%] gap-x-[2%]">

                                        <div className="border bdr-pag-100 rounded-[6px] px-[1rem] py-[0.8rem] max-h-[350px] overflow-scroll scrollbar-hide">

                                            <h3 className="pag-800 font-mona-semibold text-[14px] mb-[1rem]">Base Features ({features.length})</h3>
                                            {
                                                features.length > 0 &&
                                                <div className="space-y-[0.6rem]">
                                                    {
                                                        features.map((feature, index) =>
                                                            <Fragment key={feature.name}>
                                                                <FeatureCard feature={feature} />
                                                            </Fragment>
                                                        )
                                                    }
                                                </div>
                                            }

                                        </div>

                                        <div className="border bdr-pag-100 rounded-[6px] px-[1rem] py-[0.8rem]">

                                            <h3 className="pag-800 font-mona-semibold text-[14px] mb-[1rem]">Payment Details</h3>
                                            <EmptyState className="min-h-[250px]" noBound={true}>
                                                <span className="font-mona pag-600 text-[13px]">Details will appear here</span>
                                            </EmptyState>
                                        </div>



                                    </div>

                                </div>

                            </TabPanel>
                            <TabPanel tabIndex={1}>
                                <EmptyState className="min-h-[50vh] mt-[2rem] mb-[1rem] full-bg" noBound={true} style={{ backgroundImage: `url("../../../images/assets/bg@grad_01.webp")` }}>
                                    <span className="font-mona pag-800 text-[15px]">Your payment history will appear here soon</span>
                                </EmptyState>
                            </TabPanel>
                        </Tabs>
                    </CardUI>
                </>
            }

            {
                !helper.isEmpty(plan, 'object') &&
                <PlanModal
                    show={show}
                    flattened={true}
                    // title={`${plan.name} Plan`}
                    title={``}
                    closeModal={toggleShow}
                    size="lg"
                />
            }

            <VerifyModal
                show={showVerify}
                flattened={true}
                title={`Verification`}
                closeModal={toggleVerify}
                reference={reference}
                size="lg"
            />

            <RenewModal
                show={showRenew}
                flattened={true}
                title={`Renew Subscription`}
                closeModal={toggleRenew}
                size="lg"
            />

        </>
    )
};

export default BillingPage;
