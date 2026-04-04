import React, { useEffect, useState, useContext } from "react"
import Button from "../../partials/buttons/Button";
import Icon from "../../partials/icons/Icon";
import Plan, { IPlanPricing } from "../../../models/Plan.model";
import { CurrencySymbol, CurrencyType, FrequencyEnum, PlanNameEnum } from "../../../utils/enums.util";

interface IPlanCard {
    plan: Plan,
    currentPlan: Plan,
    frequency: string,
    loading: boolean,
    currency?: string,
    detailsOnly?: boolean,
    className?: string,
    onClick(e: any): void
}

const PlanCard = (props: IPlanCard) => {

    const {
        plan,
        currentPlan,
        frequency,
        loading,
        currency = CurrencyType.USD,
        detailsOnly = false,
        className = '',
        onClick
    } = props;

    const starter = PlanNameEnum.STARTER;
    const premium = PlanNameEnum.PREMIUM;
    const monthly = FrequencyEnum.MONTHLY;
    const month = FrequencyEnum.MONTH;
    const yearly = FrequencyEnum.YEARLY;
    const year = FrequencyEnum.YEAR;

    const [pricing, setPricing] = useState<IPlanPricing['dollar']>({ monthly: 0, yearly: 0 })

    useEffect(() => {

        getPricing()

    }, [frequency, currency])

    const cc = () => {
        let result = 'bg-color-white rounded-[10px] p-[2rem] w-full max-w-sm'
        if (!detailsOnly) {
            result = result + ` shadow-sm border bdr-pag-100 bdrh-pacb-500`
        }
        if (className) {
            result = result + ` ${className}`
        }
        return result;
    }

    const getPricing = () => {

        if (currency === CurrencyType.USD) {
            setPricing(plan.pricing.dollar)
        }

        if (currency === CurrencyType.NGN) {
            setPricing(plan.pricing.naira)
        }

    }

    const renderStarter = (center?: boolean) => {

        return (
            <>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">25 Assessments Monthly</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">15 Tasks Monthly</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">10 Projects Monthly</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">1 Career per Account</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">Monthly growth report</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">Roadmaps and Resources</span>
                </li>
            </>
        )

    }

    const renderPremium = (center?: boolean) => {

        return (
            <>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 pap-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona-medium text-[14px] pap-900">Earn while You Grow</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 pap-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona-medium text-[14px] pap-900">Exclusive 1/1 Career Sessions</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 pap-900 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona-medium text-[14px] pap-900">Resume & Portfolio Builds</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">Unlimited Assessments Monthly</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">Unlimited Tasks Monthly</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">Unlimited Projects Monthly</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">2 Careers per Account</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">Monthly growth report</span>
                </li>
                <li className={`flex items-center ${center ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="font-mona text-[14px] pag-800">Roadmaps and Resources</span>
                </li>
            </>
        )

    }

    return (
        <>

            <div className={cc()}>

                <div className="text-center">
                    <h3 className="text-[20px] font-mona-bold pag-800 mb-[0.4rem]">{plan.name} Plan</h3>
                    <p className="pag-600 mb-[1rem] font-mona text-[14px]">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                    {
                        currency === CurrencyType.USD &&
                        <span className="text-[3rem] leading-none font-mona-bold pacb-500">
                            {CurrencySymbol.USD}
                            {frequency === monthly ? pricing.monthly.toLocaleString() : pricing.yearly.toLocaleString()}
                        </span>
                    }
                    {
                        currency === CurrencyType.NGN &&
                        <span className="text-[3rem] leading-none font-mona-bold pacb-500">
                            {CurrencySymbol.NGN}
                            {frequency === monthly ? pricing.monthly.toLocaleString() : pricing.yearly.toLocaleString()}
                        </span>
                    }
                    <span className="font-mona text-[14px] pag-500">/{frequency === monthly ? month : year}</span>
                </div>

                <ul className="text-gray-700 mb-8 space-y-3 overflow-y-scroll scrollbar-hide max-h-[186px]">

                    {plan.label === starter && renderStarter(detailsOnly)}
                    {plan.label === premium && renderPremium(detailsOnly)}

                </ul>

                {
                    !detailsOnly &&
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
                        onClick={(e) => onClick(e)}
                    />
                }


            </div>

        </>
    )
};

export default PlanCard;
