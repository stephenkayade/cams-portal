import React, { useEffect, useState, useContext } from "react"
import { IVerifyModal } from "../../utils/interfaces.util";
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

const VerifyModal = (props: IVerifyModal) => {

    const {
        show,
        size = 'sm',
        header = true,
        title,
        flattened,
        className,
        reference,
        closeModal
    } = props;

    const { toDetailRoute } = useGoTo()
    const { transaction, verifyTransaction } = useTransaction();
    const { getTalent, talent } = useUser();

    const [headIn, setHeadIn] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setHeadIn(header);
        handleVerify();
    }, [header])

    useEffect(() => {
        if(!helper.isEmpty(transaction, 'object')){
            setStatus(transaction.status);
            if(transaction.status === StatusEnum.SUCCESSFUL){
                setMessage('Transaction is successful')
            } else if(transaction.status === StatusEnum.FAILED){
                setMessage('Transaction failed! Contact support')
            }
        }
    }, [transaction])

    const handleVerify = async () => {
        if(reference){
            setLoading(true);
            await verifyTransaction(reference);
            setLoading(false);
        }
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
                            <div className="flex items-center justify-center">
                                {
                                    status === StatusEnum.SUCCESSFUL &&
                                    <div className="inline-flex min-w-[100px] min-h-[100px] bg-pagr-100 justify-center items-center rounded-full mx-auto my-0">
                                        <Icon name="check" type="polio" className="pagr-800" size={40} />
                                    </div>
                                }
                                {
                                    status === StatusEnum.FAILED &&
                                    <div className="inline-flex min-w-[100px] min-h-[100px] bg-par-100 justify-center items-center rounded-full mx-auto my-0">
                                        <Icon name="cancel" type="polio" className="par-800" size={40} />
                                    </div>
                                }
                            </div>

                            <div>
                                <h2 className="font-mona-semibold text-[20px] pag-800 text-center">{ helper.capitalize(status) }!</h2>
                                <p className="font-mona text-[15px] pag-700 text-center">{message}</p>
                            </div>

                            <div className="flex items-center justify-center">
                                <Button
                                    type="primary"
                                    semantic="info"
                                    size="rg"
                                    block={false}
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
                                    onClick={(e) => {
                                        closeModal(e);
                                        getTalent(talent._id);
                                        toDetailRoute(e, { route: 'account', name: 'billing', subroute: 'billing' })
                                    }}
                                />
                            </div>
                        </>
                    }


                </div>

            </Modal>
        </>
    )
};

export default VerifyModal;
