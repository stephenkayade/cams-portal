import React, { useEffect, useState, useContext } from "react"
import { IPlanModal } from "../../../utils/interfaces.util";
import Modal from "../../partials/modals/Modal";
import useGoTo from "../../../hooks/useGoTo";
import { levels } from "../../../_data/seed";
import PlanCard from "./PlanCard";
import useUser from "../../../hooks/app/useUser";
import { CurrencyType } from "../../../utils/enums.util";

const PlanModal = (props: IPlanModal) => {

    const {
        show,
        size = 'sm',
        header = true,
        title,
        flattened,
        className,
        closeModal
    } = props;

    const { subscription, plan } = useUser();
    const [headIn, setHeadIn] = useState<boolean>(false)

    useEffect(() => {
        setHeadIn(header);

    }, [header])

    return (
        <>
            <Modal
                show={show}
                header={headIn}
                flattened={flattened}
                title={title}
                closeModal={closeModal}
                size={size}
                hideOnClose={false}
                className={className}
            >
                <div className="w-full">

                    <PlanCard
                        plan={plan}
                        currentPlan={plan}
                        currency={subscription.currency}
                        frequency={subscription.billing.frequency}
                        detailsOnly={true}
                        loading={false}
                        className="mx-auto my-0"
                        onClick={(e) => { }}
                    />

                </div>

            </Modal>
        </>
    )
};

export default PlanModal;
