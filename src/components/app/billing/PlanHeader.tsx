import React, { useEffect, useState } from "react"
import Plan, { IPlanPricing } from "../../../models/Plan.model";
import { CurrencySymbol, CurrencyType, FrequencyEnum, PlanNameEnum } from "../../../utils/enums.util";

interface IPlanHeader {
    plan: Plan,
    frequency: string,
    currency?: string
}

const PlanHeader = (props: IPlanHeader) => {

    const {
        plan,
        frequency,
        currency = CurrencyType.USD
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
        let result = `col-span-1 p-6 flex flex-col justify-end`;

        if (plan.label === starter) {
            result = result + ` border-b bdr-pag-100 bg-pacb-50`
        }

        if (plan.label === premium) {
            result = result + ` bg-pab-900 text-white relative z-10`
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

    return (
        <>
            <div className={cc()}>
                <h3 className={`text-[20px] font-mona-bold ${plan.label === starter ? 'pab-900' : 'color-white'} mb-2`}>{plan.name} Plan</h3>
                <div className="mb-4">
                    <span className={`text-4xl font-mona-xbold ${plan.label === starter ? 'pacb-600' : 'color-white'}`}>
                        {
                            currency === CurrencyType.USD &&
                            <>
                                {CurrencySymbol.USD}
                                {frequency === monthly ? pricing.monthly.toLocaleString() : pricing.yearly.toLocaleString()}
                            </>
                        }
                        {
                            currency === CurrencyType.NGN &&
                            <>
                                {CurrencySymbol.NGN}
                                {frequency === monthly ? pricing.monthly.toLocaleString() : pricing.yearly.toLocaleString()}
                            </>
                        }
                    </span>
                    <span className={`text-[14px] font-mona ${plan.label === starter ? 'pab-900' : 'color-white opacity-[0.7]'}`}>/{frequency === monthly ? month : year}</span>
                </div>
                <p className={`text-[14px] font-mona ${plan.label === starter ? 'pag-700' : 'color-white opacity-[0.8]'}`}>{plan.description}</p>
            </div>
        </>
    )
};

export default PlanHeader;
