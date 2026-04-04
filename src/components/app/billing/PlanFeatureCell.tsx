import React, { Fragment, useEffect } from "react"
import SVGIcon from "../../partials/icons/SRCIcon";
import { IUIFeature } from "../../../utils/interfaces.util";
import Plan from "../../../models/Plan.model";
import usePlan from "../../../hooks/app/usePlan";
import useUser from "../../../hooks/app/useUser";
import SwitchInput from "../../partials/inputs/SwitchInput";
import { PlanNameEnum } from "../../../utils/enums.util";
import IconButton from "../../partials/buttons/IconButton";
import Icon from "../../partials/icons/Icon";

interface IPlanFeatureCell {
    feature: IUIFeature,
    currentPlan: Plan,
    frequency: string,
    currency: string,
    onToggle?(data: { state: 'ON' | 'OFF', feature: IUIFeature }): void
}

const PlanFeatureCell = (props: IPlanFeatureCell) => {

    const {
        feature,
        currentPlan,
        frequency,
        currency,
    } = props;

    useEffect(() => {

    }, [])

    const displayLimit = (limit: number): any => {
        let result: any = ''
        if (limit > 1000) {
            result = 'Unlimited '
        } else if (limit > 1 && limit < 1000) {
            if(feature.name === 'career'){
                result = limit.toString() + ' Careers '
            } else {
                result = limit.toString() + ' /month '
            }
        }

        return result;
    }

    return (
        <>
            <div className="col-span-1 px-6 py-4 border-b border-r bdr-pag-100 pag-800 font-mona-medium text-[15px]">{feature.displayName}</div>

            {
                feature.plans.length > 0 &&
                feature.plans.map((plan) =>
                    <Fragment key={plan.name + feature.name}>

                        {
                            plan.name === PlanNameEnum.STARTER &&
                            <div className="col-span-1 p-4 border-b bdr-pag-100 flex justify-center items-center">
                                {
                                    plan.limit > 1 &&
                                    <>
                                        {feature.category === 'base' && <span className="font-mona text-[15px] pag-700">{displayLimit(plan.limit)}</span>}
                                    </>
                                }
                                {
                                    plan.limit === 1 &&
                                    <>
                                        <IconButton
                                            size="min-w-[1.5rem] min-h-[1.5rem]"
                                            className="bg-pagr-600 bgh-pagr-600"
                                            icon={{
                                                type: 'feather',
                                                name: 'check',
                                                size: 13,
                                                className: 'color-white'
                                            }}
                                            onClick={(e) => {

                                            }}
                                        />
                                    </>
                                }
                                {
                                    plan.limit === 0 && !plan.isEnabled &&
                                    <Icon
                                        type={'polio'}
                                        name={'cancel'}
                                        className={'par-600'}
                                        size={25}
                                    />
                                }
                            </div>
                        }

                        {
                            plan.name === PlanNameEnum.PREMIUM &&
                            <div className="col-span-1 p-4 border-b bdr-pag-100 flex justify-center items-center border-l bdr-pag-100">
                                {
                                    plan.limit > 1 &&
                                    <>
                                        {feature.category === 'base' && <span className="font-mona text-[15px] pag-700">{displayLimit(plan.limit)}</span>}
                                    </>
                                }
                                {
                                    plan.limit === 1 &&
                                    <>
                                        <IconButton
                                            size="min-w-[1.5rem] min-h-[1.5rem]"
                                            className="bg-pagr-600 bgh-pagr-600"
                                            icon={{
                                                type: 'feather',
                                                name: 'check',
                                                size: 13,
                                                className: 'color-white'
                                            }}
                                            onClick={(e) => {

                                            }}
                                        />
                                    </>
                                }
                                {
                                    plan.limit === 0 && !plan.isEnabled &&
                                    <Icon
                                        type={'polio'}
                                        name={'cancel'}
                                        className={'par-600'}
                                        size={25}
                                    />
                                }
                            </div>
                        }

                    </Fragment>
                )
            }
        </>
    )
};

export default PlanFeatureCell;
