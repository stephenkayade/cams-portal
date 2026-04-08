import { useEffect, useState } from "react"
import { IMessageModal } from "../../utils/interfaces.util";
import Modal from "../partials/modals/Modal";
import useGoTo from "../../hooks/useGoTo";
import Button from "../partials/buttons/Button";
import Icon from "../partials/icons/Icon";
import { StatusEnum } from "../../utils/enums.util";
import helper from "../../utils/helper.util";

const MessageModal = (props: IMessageModal) => {

    const {
        show,
        size = 'sm',
        header = true,
        title,
        flattened,
        className,
        type,
        message,
        closeModal
    } = props;

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
                <div className="py-[2rem] space-y-[1.5rem]">

                    <div className="flex items-center justify-center">
                        {
                            type === StatusEnum.SUCCESSFUL &&
                            <div className="inline-flex min-w-[100px] min-h-[100px] bg-pagr-100 justify-center items-center rounded-full mx-auto my-0">
                                <Icon name="check" type="polio" className="pagr-800" size={40} />
                            </div>
                        }
                        {
                            type === StatusEnum.FAILED &&
                            <div className="inline-flex min-w-[100px] min-h-[100px] bg-par-100 justify-center items-center rounded-full mx-auto my-0">
                                <Icon name="cancel" type="polio" className="par-800" size={40} />
                            </div>
                        }
                    </div>

                    <div>
                        <h2 className="font-mona-semibold text-[20px] pag-800 text-center">{helper.capitalize(type)}!</h2>
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
                                // window.location.reload()
                            }}
                        />
                    </div>

                </div>

            </Modal>
        </>
    )
};

export default MessageModal;
