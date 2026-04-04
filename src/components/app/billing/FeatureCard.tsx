import React, { useEffect, useState, useContext } from "react"
import { IPlanFeature } from "../../../models/Plan.model";
import useUser from "../../../hooks/app/useUser";
import SwitchInput from "../../partials/inputs/SwitchInput";
import helper from "../../../utils/helper.util";

interface IFeatureCard {
    feature: IPlanFeature
}

const FeatureCard = (props: IFeatureCard) => {

    const {
        feature
    } = props;

    const { subscription, plan, featureExists } = useUser();

    const [show, setShow] = useState<boolean>(false);
    const [action, setAction] = useState<'enable' | 'disable'>('enable');

    useEffect(() => {

    }, [])

    const toggleShow = (action?: any) => {

        // enabled for activation only
        if (action && action === 'enable') {
            setAction('enable')
            setTimeout(() => {
                setShow(!show)
            }, 100)
        } else {
            setShow(false)
        }

    }

    const isActive = () => {

        let result = { label: 'OFF', active: false }

        if (feature.category === 'addon') {

            const subFeature = subscription.features.find((ft) => ft.name === feature.name)

            if (subFeature && subFeature.category === 'addon') {
                result.label = 'ON'
                result.active = true;
            }

        } else {
            result.label = 'ON'
            result.active = true;
        }

        return result;
    }

    const displayLimit = () => {

        let result = `0/0 left`;

        const subfeature = subscription.features.find((ft) => ft.name === feature.name);
        const planFeature = plan.features.find((ft) => ft.name === feature.name);

        if (planFeature && subfeature) {

            if (planFeature.limit > 1000) {
                result = `Unlimited`
            } else if (planFeature.limit === 1) {
                result = "Available"
            } else {
                result = subfeature.limit === 0 ? `${planFeature.limit} left` : `${subfeature.limit} / ${planFeature.limit} left`
            }

        }

        return result

    }

    return (
        <>
            <div className={`flex items-center border ${isActive().active ? 'bg-pacb-50 bdr-pacb-100' : 'bdr-pag-100'} rounded-[5px] p-[0.5rem]`}>

                <div className="space-y-[0.25rem]">
                    <h3 className="pag-800 font-mona-medium text-[14px]">{helper.capitalizeWord(feature.displayName)}</h3>
                    <p className="font-mona text-[13px] pag-500">{helper.capitalize(feature.description)}</p>
                </div>

                <div className="ml-auto flex items-center gap-x-[1.5rem]">

                    {
                        isActive().active &&
                        <h3 className="pag-800 font-mona-medium text-[13px]">{displayLimit()}</h3>
                    }

                    {
                        feature.category === 'addon' &&
                        <SwitchInput
                            checked={isActive().active}
                            disabled={false}
                            className="ml-auto"
                            label={{
                                text: isActive().label
                            }}
                            onChange={(check) => {
                                if (check && !featureExists(feature.name)) {
                                    toggleShow('enable')
                                }
                            }}
                        />
                    }

                </div>

            </div>

        </>
    )
};

export default FeatureCard;
