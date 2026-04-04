import React, { useEffect, useState, useContext } from "react"
import Divider from "../../components/partials/Divider";
import Alert from "../../components/partials/ui/Alert";
import { IAlert } from "../../utils/interfaces.util";
import useGoTo from "../../hooks/useGoTo";
import FormField from "../../components/partials/inputs/FormField";
import TextInput from "../../components/partials/inputs/TextInput";
import PasswordInput from "../../components/partials/inputs/PasswordInput";
import Button from "../../components/partials/buttons/Button";
import LinkButton from "../../components/partials/buttons/LinkButton";
import useAuth from "../../hooks/app/useAuth";
import Filter from "../../components/partials/drops/Filter";
import helper from "../../utils/helper.util";
import PhoneInput from "../../components/partials/inputs/PhoneInput";
import { URL_ACTIVATE, URL_REG_CALLBACK } from "../../utils/path.util";
import Icon from "../../components/partials/icons/Icon";
import Message from "../../components/partials/dialogs/Message";

const VerifyPage = ({ }) => {

    const { goTo } = useGoTo()
    const { activateAccount } = useAuth()

    const [step, setStep] = useState<number>(0)
    const [form, setForm] = useState({
        code: '',
        url: URL_ACTIVATE,
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<IAlert>({
        name: '',
        type: 'success',
        show: false,
        message: ''
    });

    useEffect(() => {

    }, [])

    const handleVerify = async (e: any) => {

        if (e) { e.preventDefault(); }

        if (!form.code) {
            setAlert({ ...alert, type: 'error', show: true, name: 'code', message: 'verification code is required' });
        } else {

            setLoading(true);

            const response = await activateAccount(form)

            if (!response.error) {
                setStep(1)
                setLoading(false)
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
            <section className="auth-page w-full h-[100vh] flex gap-x-0">

                <div className="left-halve w-[52%] px-[1.5rem] py-[1.5rem] h-full flex items-center flex-col pt-[5rem]">

                    <div className="w-full h-full relative">

                        <div className="">

                            {
                                step === 0 &&
                                <>
                                    <Divider show={false} padding={{ enable: true, top: 'pt-[2.5rem]', bottom: 'pb-[2.5rem]' }} />

                                    <div className="text-center">
                                        <h3 className="font-uncut-bold text-[25px] pas-950 tracking-[-1px]">Verify your account</h3>
                                        <p className="mb-0 font-mona-light text-[14px] pag-600">Verify your Pacitude account</p>
                                    </div>

                                    <Divider show={false} padding={{ enable: true, top: 'pt-[1rem]', bottom: 'pb-[1rem]' }} />

                                    <div className="w-[50%] mx-auto my-0 space-y-[0.65rem]">

                                        <div className="w-full py-[20px] px-[21px] bg-pag-50 rounded-[5px]">
                                            <p className="font-mona-light text-[13px] pag-900">We’ve sent a 6-digit code to your email. Please enter the code below so we can verify your account </p>
                                        </div>

                                        <Divider show={false} padding={{ enable: true, top: 'pt-[0.5rem]', bottom: 'pb-[0.5rem]' }} />

                                        <Alert className="" type={alert.type} show={alert.show} message={alert.message} />

                                        <FormField className="">
                                            <TextInput
                                                type="email"
                                                size="rg"
                                                showFocus={true}
                                                autoComplete={false}
                                                placeholder="Ex. 000-000"
                                                isError={alert.name === 'code' ? true : false}
                                                label={{
                                                    required: true,
                                                    fontSize: 13,
                                                    title: "Enter Verification Code"
                                                }}
                                                onChange={(e) => { setForm({ ...form, code: e.target.value }) }}
                                            />
                                        </FormField>

                                        <Divider show={false} padding={{ enable: true, top: 'pt-[0.3rem]', bottom: 'pb-[0.3rem]' }} />

                                        <FormField className="">
                                            <Button
                                                type="primary"
                                                size="md"
                                                loading={loading}
                                                disabled={false}
                                                block={true}
                                                className="form-button"
                                                text={{
                                                    label: "Verify Account",
                                                    size: 14,
                                                    weight: 'medium'
                                                }}
                                                icon={{
                                                    enable: true,
                                                    child: <></>
                                                }}
                                                onClick={(e) => handleVerify(e)}
                                            />
                                        </FormField>

                                        <FormField className="mb-[1rem] text-center pt-[1rem] pb-[1rem]">
                                            <LinkButton
                                                text={{
                                                    label: 'Resend Code',
                                                    className: 'text-[13px]',
                                                    weight: 'regular',
                                                    color: 'pacb-500'
                                                }}
                                                disabled={true}
                                                loading={false}
                                                icon={{
                                                    enable: false
                                                }}
                                                url=""
                                                onClick={(e) => { goTo('/login') }}
                                            />
                                        </FormField>

                                    </div>
                                </>
                            }

                            {
                                step === 1 &&
                                <>
                                    <Divider show={false} />

                                    <div className="w-[60%] mx-auto my-0">

                                        <Message
                                            type="success"
                                            message="You have successfully registered and your account has been verified. Continue to access your account"
                                            title="Way to go!"
                                            button={{
                                                enable: true,
                                                text: "Continue",
                                                onClick: (e) => {goTo('/login')}
                                            }}
                                        />

                                    </div>
                                </>
                            }

                        </div>

                        <div className="w-full text-center absolute bottom-[1rem]">
                            <p className="font-mona text-[13px] pag-300">Copyright © Concreap Technologies</p>
                        </div>

                    </div>

                </div>

                <div className="right-halve w-[48%] pr-[1.5rem] py-[1.5rem] pl-0 h-full">
                    <div className="w-[100%] h-[100%] rounded-[20px] full-bg relative" style={{ backgroundImage: `url("../../../images/assets/bg@auth.webp")` }}>

                        <div className="w-full flex items-center min-h-[100px] px-[3rem]">
                            <img src="../../../images/assets/logo.svg" className="w-[150px]" alt="logo.svg" />
                        </div>

                        <div className="w-[100%] px-[3rem] absolute left-0 bottom-[5rem] space-y-[1.2rem]">
                            <h1 className="font-uncut-bold pas-950 text-[60px] leading-[58px] tracking-[-2px]">Measure, master and move forward.</h1>
                            <div className="w-[70%]">
                                <p className="font-mona text-[20px] pas-950">
                                    Measure your progress, master your craft, and move forward with confidence. 🚀
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </>
    )
};

export default VerifyPage;
