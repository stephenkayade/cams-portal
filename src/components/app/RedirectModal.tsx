import { useEffect, useState } from "react"
import { IRedirectModal } from "../../utils/interfaces.util";
import Modal from "../partials/modals/Modal";
import useGoTo from "../../hooks/useGoTo";
import Button from "../partials/buttons/Button";
import Icon from "../partials/icons/Icon";

const RedirectModal = (props: IRedirectModal) => {

    const {
        show,
        size = 'sm',
        header = true,
        title,
        flattened,
        className,
        message,
        redirectUrl,
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
                <div className="mt-[2rem] space-y-[1.2rem]">

                    <div className="w-full">
                        <p className="font-mona text-[15px] pag-700">{message}</p>
                    </div>

                    <Button
                        type="primary"
                        semantic="info"
                        size="rg"
                        block={false}
                        className="form-button min-w-[200px]"
                        text={{
                            label: `Continue`,
                            size: 13,
                            weight: 'semibold'
                        }}
                        icon={{
                            enable: true,
                            child: <Icon name="nav-arrow-right" type="polio" size={16} className="color-white" />
                        }}
                        url={redirectUrl}
                        onClick={(e) => {
                            closeModal(e)
                        }}
                    />

                </div>

            </Modal>
        </>
    )
};

export default RedirectModal;
