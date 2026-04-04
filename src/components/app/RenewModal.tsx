import React, { useEffect, useState, useContext } from "react"
import { IAlert, IRenewModal } from "../../utils/interfaces.util";
import Modal from "../partials/modals/Modal";
import useGoTo from "../../hooks/useGoTo";
import { levels } from "../../_data/seed";
import Button from "../partials/buttons/Button";
import Icon from "../partials/icons/Icon";
import useTransaction from "../../hooks/app/useTransaction";
import EmptyState from "../partials/dialogs/EmptyState";
import { StatusEnum } from "../../utils/enums.util";
import helper from "../../utils/helper.util";
import useUser from "../../hooks/app/useUser";
import usePlan from "../../hooks/app/usePlan";
import Alert from "../partials/ui/Alert";

const RenewModal = (props: IRenewModal) => {

    const {
        show,
        size = 'sm',
        header = true,
        title,
        flattened,
        className,
        closeModal
    } = props;

    const { toDetailRoute } = useGoTo()
    const { loading, renewSubscription } = usePlan();
    const { getTalent, talent } = useUser();

    const [headIn, setHeadIn] = useState<boolean>(false)
    const [step, setStep] = useState<number>(0)
    const [alert, setAlert] = useState<IAlert>({
        name: '',
        type: 'success',
        show: false,
        message: ''
    });

    useEffect(() => {
        setHeadIn(header);
    }, [header])

    const handleRenew = async (e: any) => {

        if (e) { e.preventDefault() }

        const response = await renewSubscription(talent._id);

        if (!response.error) {
            setStep(1);
        }

        if (response.error) {

            if (response.errors.length > 0) {
                setAlert({ ...alert, type: 'error', show: true, name: '', message: response.errors.join(',') });
            } else {
                setAlert({ ...alert, type: 'error', show: true, name: '', message: response.message });
            }
        }

        setTimeout(() => {
            setAlert({ ...alert, show: false });
        }, 1800)

    }

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
                <div className="py-[2rem] space-y-[1.5rem]">

                    {
                        loading &&
                        <EmptyState className="min-h-[250px]" noBound={true}>
                            <span className="loader lg primary"></span>
                        </EmptyState>
                    }

                    {
                        !loading &&
                        <>
                            {
                                step === 0 &&
                                <>
                                    <div className="mt-[1rem] space-y-[1.5rem]">
                                        <Alert className="" type={alert.type} show={alert.show} message={alert.message} />
                                        <div className="w-full">
                                            <p className="font-mona text-[15px] pag-800">
                                                Your subscription will be renewed. This means your current subscription amount will be charged from your already added card. Click the button below to continue.
                                            </p>
                                        </div>
                                        <Button
                                            type="primary"
                                            semantic="info"
                                            size="rg"
                                            block={false}
                                            loading={loading}
                                            className="form-button min-w-[150px]"
                                            text={{
                                                label: `Continue`,
                                                size: 13,
                                                weight: 'semibold'
                                            }}
                                            icon={{
                                                enable: true,
                                                child: <Icon name="nav-arrow-right" type="polio" size={16} className="color-white" />
                                            }}
                                            onClick={(e) => handleRenew(e)}
                                        />
                                    </div>
                                </>
                            }
                            {
                                step === 1 &&
                                <>
                                    <div className="flex items-center justify-center">
                                        <div className="inline-flex min-w-[100px] min-h-[100px] bg-pagr-100 justify-center items-center rounded-full mx-auto my-0">
                                            <Icon name="check" type="polio" className="pagr-800" size={40} />
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="font-mona-semibold text-[20px] pag-800 text-center">Successful!</h2>
                                        <p className="font-mona text-[15px] pag-700 text-center">Your subscription has been renewed successfully.</p>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <Button
                                            type="primary"
                                            semantic="info"
                                            size="rg"
                                            block={false}
                                            className="form-button min-w-[150px]"
                                            text={{
                                                label: `Ok, Got it`,
                                                size: 13,
                                                weight: 'semibold'
                                            }}
                                            icon={{
                                                enable: true,
                                                child: <Icon name="nav-arrow-right" type="polio" size={16} className="color-white" />
                                            }}
                                            onClick={(e) => {
                                                closeModal(e);
                                                getTalent(talent._id);
                                            }}
                                        />
                                    </div>
                                </>
                            }
                        </>
                    }


                </div>

            </Modal>
        </>
    )
};

export default RenewModal;
