import { useEffect, useState } from "react"
import { IAlert, IForgotModal } from "../../../utils/interfaces.util";
import Modal from "../../partials/modals/Modal";
import FormField from "../../partials/inputs/FormField";
import TextInput from "../../partials/inputs/TextInput";
import Button from "../../partials/buttons/Button";
import LinkButton from "../../partials/buttons/LinkButton";
import useAuth from "../../../hooks/app/useAuth";
import Alert from "../../partials/ui/Alert";
import Icon from "../../partials/icons/Icon";
import useGoTo from "../../../hooks/useGoTo";
import storage from "../../../utils/storage.util";

const ForgotPassword = (props: IForgotModal) => {

    const {
        show,
        size = 'sm',
        header = true,
        title,
        flattened,
        className,
        closeModal
    } = props;

    const { sendResetLink } = useAuth()
    const { goTo } = useGoTo()

    const [headIn, setHeadIn] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0)
    const [form, setForm] = useState({
        email: '',
        type: 'otp'
    })
    const [alert, setAlert] = useState<IAlert>({
        name: '',
        type: 'success',
        show: false,
        message: ''
    });

    useEffect(() => {
        setHeadIn(header)
    }, [header])

    const handleForgot = async (e: any) => {

        if (e) { e.preventDefault(); }

        if (!form.email) {
            setAlert({ ...alert, type: 'error', show: true, name: 'email', message: 'email is required' });
        } else {

            setLoading(true);

            const response = await sendResetLink(form)

            if (!response.error) {
                setStep(1);
                setHeadIn(false)
                setLoading(false)
                storage.keepLegacy('email', form.email)
            }

            if (response.error) {

                setLoading(false)

                if (response.errors.length > 0) {
                    setAlert({ ...alert, type: 'error', show: true, name: '', message: response.errors.join(',') });
                } else {
                    setAlert({ ...alert, type: 'error', show: true, name: '', message: response.message });
                }

            }

        }

        setTimeout(() => {
            setAlert({ ...alert, show: false, name: '' });
        }, 2000)

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
                <div className="mt-[1.5rem] space-y-[1.5rem]">

                    {
                        step === 0 &&
                        <>
                            <p className="font-mona-light text-[15px] pag-900">
                                We understand the situation. Sometimes, we forget things too. Enter your email below and we’ll send you a 6-digit code to reset your password.
                            </p>

                            <Alert className="" type={alert.type} show={alert.show} message={alert.message} />

                            <FormField className="mb-[1rem] flex items-center gap-x-[1rem]">

                                <div className="grow">
                                    <TextInput
                                        type="email"
                                        size="rg"
                                        showFocus={true}
                                        autoComplete={false}
                                        placeholder="Ex. you@example.com"
                                        isError={alert.name === 'email' ? true : false}
                                        label={{
                                            required: true,
                                            fontSize: 13,
                                            title: "Email Address"
                                        }}
                                        onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
                                    />
                                </div>

                                <div className="w-1/3">
                                    <Button
                                        type="primary"
                                        size="rg"
                                        loading={loading}
                                        disabled={false}
                                        block={true}
                                        className="form-button relative top-[0.7rem]"
                                        text={{
                                            label: "Send Code",
                                            size: 13,
                                            weight: 'medium'
                                        }}
                                        onClick={(e) => handleForgot(e)}
                                    />
                                </div>

                            </FormField>

                            <div className="w-full py-[1rem]">
                                <LinkButton
                                    text={{
                                        label: 'I Remember My Password',
                                        className: 'text-[13px]',
                                        weight: 'medium',
                                        color: 'pacb-500'
                                    }}
                                    disabled={false}
                                    loading={false}
                                    icon={{
                                        enable: false
                                    }}
                                    onClick={(e) => closeModal(e)}
                                />
                            </div>
                        </>
                    }

                    {
                        step === 1 &&
                        <>
                            <div className="w-full h-full text-center space-y-[1.5rem] pb-[1.5rem]">
                                <div className="inline-flex min-w-[100px] min-h-[100px] bg-pagr-100 justify-center items-center rounded-full mx-auto my-0">
                                    <Icon name="check" type="polio" className="pagr-800" size={40} />
                                </div>

                                <div className="w-full text-center mt-[1rem]">
                                    <h2 className="font-uncut-bold text-[25px] pas-950">Successful!</h2>

                                    <p className="font-mona-light text-[14px] pas-950 text-center max-w-[70%] mx-auto">
                                        Click proceed to enter the code sent to your email for reseting your password
                                    </p>
                                </div>

                                <Button
                                    type="primary"
                                    size="md"
                                    loading={loading}
                                    disabled={false}
                                    block={false}
                                    className="form-button min-w-[150px]"
                                    text={{
                                        label: "Continue",
                                        size: 13,
                                        weight: 'medium'
                                    }}
                                    icon={{
                                        enable: true,
                                        child: <></>
                                    }}
                                    onClick={(e) => { goTo('/reset-password') }}
                                />

                            </div>
                        </>
                    }


                </div>

            </Modal>
        </>
    )
};

export default ForgotPassword;
