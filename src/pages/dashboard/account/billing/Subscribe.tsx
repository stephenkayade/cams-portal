import React, { useEffect, useState, useContext, Fragment } from "react"
import useSidebar from "../../../../hooks/useSidebar";
import useUser from "../../../../hooks/app/useUser";
import useToast from "../../../../hooks/useToast";
import Button from "../../../../components/partials/buttons/Button";
import Icon from "../../../../components/partials/icons/Icon";
import CardUI from "../../../../components/partials/ui/CardUI";
import LinkButton from "../../../../components/partials/buttons/LinkButton";
import storage from "../../../../utils/storage.util";
import { CurrencyType, FrequencyEnum, PlanNameEnum, } from "../../../../utils/enums.util";
import CardLoading from "../../../../components/app/loaders/CardLoading";
import usePlan from "../../../../hooks/app/usePlan";
import PlanCard from "../../../../components/app/billing/PlanCard";
import { Link } from "react-router-dom";
import PlanHeader from "../../../../components/app/billing/PlanHeader";
import { UIPlanFeatures } from "../../../../_data/seed";
import PlanFeatureCell from "../../../../components/app/billing/PlanFeatureCell";
import Plan from "../../../../models/Plan.model";
import RedirectModal from "../../../../components/app/RedirectModal";
import { IUIFeature } from "../../../../utils/interfaces.util";
import PlanCellDivider from "../../../../components/app/billing/PlanCellDivider";

const SubscribePage = ({ }) => {

    useSidebar({ type: 'page', init: true })
    const { plans, loading, getPlans, subscribeUser, uiFeatures } = usePlan();
    const { subscription, plan: currentPlan, talent } = useUser();
    const { toast, setToast, clearToast } = useToast()

    const [show, setShow] = useState<boolean>(false);
    const [frequency, setFrequency] = useState<string>(FrequencyEnum.MONTHLY)
    const [compare, setCompare] = useState<boolean>(true)
    const [redirectUrl, setRedirectUrl] = useState<string>('')
    const [baseFeatures, setBaseFeatures] = useState<Array<IUIFeature>>([])
    const [addonFeatures, setAddonFeatures] = useState<Array<IUIFeature>>([])
    const [addons, setAddOns] = useState<Array<string>>([])

    useEffect(() => {
        getPlans({ limit: 9999, page: 1, order: 'asc' });
    }, [])

    useEffect(() => {
        getFeatures()
    }, [plans])

    const getFeatures = () => {

        if (plans.data.length > 0) {

            const base = uiFeatures.filter((ft) => ft.category === 'base')
            const addon = uiFeatures.filter((ft) => ft.category === 'addon')

            // set features
            setBaseFeatures(base);
            setAddonFeatures(addon);

        }

    }

    const toggleFrequency = (e: any, cycle: string) => {
        if (e) { e.preventDefault() }
        setFrequency(cycle)
    }

    const toggleShow = (e: any) => {
        if (e) { e.preventDefault() }
        setShow(!show)
    }

    const handleSubscribe = async (e: any, code: string) => {

        if (e) { e.preventDefault() }

        const response = await subscribeUser({
            id: talent._id,
            planCode: code,
            frequency: frequency
        });

        if (!response.error) {

            if (response.data.url) {
                setRedirectUrl(response.data.url)
                toggleShow(null)
            }

        }

        if (response.error) {

            let message = response.message;
            if (response.errors.length > 0) {
                message = response.errors.join(',')
            }

            setToast({
                ...toast,
                show: true,
                type: 'error',
                title: 'Error',
                message: message,
                error: 'all',
                position: 'top-right'
            })
        }

    }

    return (
        <>

            {
                plans.loading &&
                <CardLoading size={1} type="plan" />
            }

            {
                !plans.loading &&
                <>

                    {
                        plans.data.length > 0 &&
                        <>
                            {
                                !compare &&
                                <CardUI noBorder={true} className="space-y-[1.5rem]">

                                    <div className="text-center">
                                        <p className="mt-2 font-mona text-[16px] pag-500">
                                            Find the perfect fit for your needs with a detailed feature comparison.
                                        </p>
                                        <div className="w-full flex justify-center pt-[1.2rem]">
                                            <div className="w-[18%] min-h-[45px] bg-pag-50 flex items-center justify-center gap-x-[1rem] p-[0.5rem] rounded-full">
                                                <Link to="" onClick={(e) => toggleFrequency(e, FrequencyEnum.MONTHLY)} className={`inline-block w-1/2 ${frequency === FrequencyEnum.MONTHLY ? 'bg-color-white' : ''} h-[100%] rounded-full text-center`}>
                                                    <span className={`text-[14px] ${frequency === FrequencyEnum.MONTHLY ? 'pag-900 font-mona-medium' : 'font-mona pag-400'} pag-400`}>Monthly</span>
                                                </Link>
                                                <Link to="" onClick={(e) => toggleFrequency(e, FrequencyEnum.YEARLY)} className={`inline-block w-1/2 ${frequency === FrequencyEnum.YEARLY ? 'bg-color-white' : ''} h-[100%] rounded-full text-center`}>
                                                    <span className={`text-[14px] ${frequency === FrequencyEnum.YEARLY ? 'pag-900 font-mona-medium' : 'pag-400 font-mona'} pag-400`}>Yearly</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <LinkButton
                                            text={{
                                                label: 'Compare Plans',
                                                className: 'text-[12px]',
                                                weight: 'medium',
                                                color: 'pacb-500'
                                            }}
                                            icon={{ enable: false }}
                                            disabled={false}
                                            loading={false}
                                            onClick={(e) => setCompare(true)}
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-center items-center gap-x-[2rem]">

                                        {
                                            plans.data.map((plan: Plan) =>
                                                <Fragment key={plan._id}>
                                                    <PlanCard
                                                        plan={plan}
                                                        currentPlan={currentPlan}
                                                        currency={subscription ? subscription.currency : CurrencyType.USD}
                                                        frequency={frequency}
                                                        loading={loading}
                                                        onClick={(e) => handleSubscribe(e, plan.code)}
                                                    />
                                                </Fragment>
                                            )
                                        }

                                    </div>

                                </CardUI>
                            }

                            {
                                compare &&
                                <CardUI flat={true} noBorder={true} className="flex items-center justify-center py-16 px-4">

                                    <div className="mx-auto w-full">

                                        <div className="text-center mb-12">
                                            <p className="mt-2 font-mona text-[16px] pag-500">
                                                Find the perfect fit for your needs with a detailed feature comparison.
                                            </p>
                                            <div className="w-full flex justify-center pt-[1.2rem]">
                                                <div className="w-[18%] min-h-[45px] bg-pag-50 flex items-center justify-center gap-x-[1rem] p-[0.5rem] rounded-full">
                                                    <Link to="" onClick={(e) => toggleFrequency(e, FrequencyEnum.MONTHLY)} className={`inline-block w-1/2 ${frequency === FrequencyEnum.MONTHLY ? 'bg-color-white' : ''} h-[100%] rounded-full text-center`}>
                                                        <span className={`text-[14px] ${frequency === FrequencyEnum.MONTHLY ? 'pag-900 font-mona-medium' : 'font-mona pag-400'} pag-400`}>Monthly</span>
                                                    </Link>
                                                    <Link to="" onClick={(e) => toggleFrequency(e, FrequencyEnum.YEARLY)} className={`inline-block w-1/2 ${frequency === FrequencyEnum.YEARLY ? 'bg-color-white' : ''} h-[100%] rounded-full text-center`}>
                                                        <span className={`text-[14px] ${frequency === FrequencyEnum.YEARLY ? 'pag-900 font-mona-medium' : 'pag-400 font-mona'} pag-400`}>Yearly</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <LinkButton
                                                text={{
                                                    label: 'See Short Version',
                                                    className: 'text-[12px]',
                                                    weight: 'medium',
                                                    color: 'pacb-500'
                                                }}
                                                icon={{ enable: false }}
                                                disabled={false}
                                                loading={false}
                                                onClick={(e) => setCompare(false)}
                                            />
                                        </div>

                                        <div className="bg-white rounded-lg overflow-hidden border bdr-pag-100">

                                            <div className="grid grid-cols-[auto_1fr_1fr] md:grid-cols-[250px_1fr_1fr] lg:grid-cols-[300px_1fr_1fr]">
                                                <div className="col-span-1 p-6 bg-color-white border-b border-r bdr-pag-100 font-mona-semibold pab-900 text-[1.15rem] flex items-end">
                                                    Features
                                                </div>

                                                {
                                                    plans.data.map((plan) =>
                                                        <Fragment key={plan._id}>
                                                            <PlanHeader
                                                                plan={plan}
                                                                currency={subscription ? subscription.currency : CurrencyType.USD}
                                                                frequency={frequency}
                                                            />
                                                        </Fragment>
                                                    )
                                                }

                                                {
                                                    plans.data.length > 0 &&
                                                    <>
                                                        {
                                                            baseFeatures.map((feature, index) =>
                                                                <Fragment key={feature.name}>
                                                                    <PlanFeatureCell
                                                                        feature={feature}
                                                                        currentPlan={currentPlan}
                                                                        frequency={frequency}
                                                                        currency={subscription ? subscription.currency : CurrencyType.NGN}
                                                                    />
                                                                </Fragment>
                                                            )
                                                        }

                                                        {
                                                            addonFeatures.length > 0 &&
                                                            <>
                                                                <PlanCellDivider text="Feature Add-Ons" />

                                                                {
                                                                    addonFeatures.map((feature, index) =>
                                                                        <Fragment key={feature.name}>
                                                                            <PlanFeatureCell
                                                                                feature={feature}
                                                                                currentPlan={currentPlan}
                                                                                frequency={frequency}
                                                                                currency={subscription ? subscription.currency : CurrencyType.NGN}
                                                                                onToggle={(data) => {
                                                                                    if (data.state === 'ON') {
                                                                                        setAddOns(prev => Array.from(new Set([...prev, data.feature.name])));
                                                                                    } else if (data.state === 'OFF') {
                                                                                        setAddOns(prev => prev.filter((a) => a !== data.feature.name));
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </Fragment>
                                                                    )
                                                                }
                                                            </>
                                                        }

                                                    </>

                                                }

                                                <div className="col-span-1 p-6 bg-pacb-50 border-r bdr-pag-100"></div>

                                                {
                                                    plans.data.map((plan: Plan) =>
                                                        <Fragment key={plan.label}>
                                                            {
                                                                plan.label === PlanNameEnum.STARTER &&
                                                                <div className="col-span-1 p-6">
                                                                    <Button
                                                                        type="primary"
                                                                        semantic="info"
                                                                        size="rg"
                                                                        block={true}
                                                                        loading={loading}
                                                                        disabled={plan.code === currentPlan.code ? true : false}
                                                                        className="form-button"
                                                                        text={{
                                                                            label: `Choose ${plan.name}`,
                                                                            size: 13,
                                                                            weight: 'semibold'
                                                                        }}
                                                                        icon={{
                                                                            enable: true,
                                                                            child: <Icon name="nav-arrow-right" type="polio" size={16} className="color-white" />
                                                                        }}
                                                                        onClick={(e) => handleSubscribe(e, plan.code)}
                                                                    />
                                                                </div>
                                                            }
                                                            {
                                                                plan.label === PlanNameEnum.PREMIUM &&
                                                                <div className="col-span-1 p-6 border-l bdr-pag-100">
                                                                    <Button
                                                                        type="primary"
                                                                        semantic="info"
                                                                        size="rg"
                                                                        block={true}
                                                                        loading={loading}
                                                                        disabled={plan.code === currentPlan.code ? true : false}
                                                                        className="form-button"
                                                                        text={{
                                                                            label: `Choose ${plan.name}`,
                                                                            size: 13,
                                                                            weight: 'semibold'
                                                                        }}
                                                                        icon={{
                                                                            enable: true,
                                                                            child: <Icon name="nav-arrow-right" type="polio" size={16} className="color-white" />
                                                                        }}
                                                                        onClick={(e) => handleSubscribe(e, plan.code)}
                                                                    />
                                                                </div>
                                                            }
                                                        </Fragment>
                                                    )
                                                }

                                            </div>
                                        </div>

                                    </div>

                                </CardUI>
                            }

                        </>
                    }



                </>
            }

            <RedirectModal
                show={show}
                flattened={true}
                title={`Complete Payment`}
                closeModal={toggleShow}
                message="You will be redirected to complete your subscription payment. Your payment will be processed by Paystack - Our payment partner."
                redirectUrl={redirectUrl}
                size="lg"
            />

        </>
    )
};

export default SubscribePage;
