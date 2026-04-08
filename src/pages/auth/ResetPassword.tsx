import { useState } from "react"
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
import Message from "../../components/partials/dialogs/Message";

const ResetPassword = ({ }) => {

    const { goTo } = useGoTo()
    const { resetPassword } = useAuth()

    const [step, setStep] = useState<number>(0)
    const [form, setForm] = useState({
        email: '',
        code: '',
        password: '',
        confirm: ''
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<IAlert>({
        name: '',
        type: 'success',
        show: false,
        message: ''
    });

    const handleReset = async (e: any) => {

        if (e) { e.preventDefault(); }

        if (step === 0) {

            if (!form.password) {
                setAlert({ ...alert, type: 'error', show: true, name: 'password', message: 'password is required' });
            } else if (!form.confirm) {
                setAlert({ ...alert, type: 'error', show: true, name: 'confirm', message: 'Type password again!' });
            } else if (form.password !== form.confirm) {
                setAlert({ ...alert, type: 'error', show: true, name: 'all', message: 'Passwords does not match' });
            } else {
                setStep(1)
            }

        }

        if (step === 1) {
            
            if (!form.code) {
                setAlert({ ...alert, type: 'error', show: true, name: 'code', message: 'verification code is required' });
            } else {

                setLoading(true);

                const response = await resetPassword(form)

                if (!response.error) {
                    setStep(2);
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
                                        <h3 className="font-uncut-bold text-[25px] pas-950 tracking-[-1px]">Change Your Password</h3>
                                        <p className="mb-0 font-mona-light text-[14px] pag-600">Ensure you choose a password you can remember</p>
                                    </div>

                                    <Divider show={false} />

                                    <div className="w-[50%] mx-auto my-0 space-y-[0.65rem]">

                                        <Alert className="" type={alert.type} show={alert.show} message={alert.message} />

                                        <FormField className="">
                                            <PasswordInput
                                                showFocus={true}
                                                autoComplete={false}
                                                placeholder="••••••••"
                                                isError={alert.name === 'password' ? true : false}
                                                label={{
                                                    required: true,
                                                    fontSize: 13,
                                                    title: "Enter New Password"
                                                }}
                                                onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                                            />
                                        </FormField>

                                        <FormField className="">
                                            <PasswordInput
                                                showFocus={true}
                                                autoComplete={false}
                                                placeholder="••••••••"
                                                isError={alert.name === 'confirm' ? true : false}
                                                label={{
                                                    required: true,
                                                    fontSize: 13,
                                                    title: "Type Password Again"
                                                }}
                                                onChange={(e) => { setForm({ ...form, confirm: e.target.value }) }}
                                            />
                                        </FormField>

                                        <Divider show={false} padding={{ enable: true, top: 'pt-[0.6rem]', bottom: 'pb-[0.6rem]' }} />

                                        <FormField className="">
                                            <Button
                                                type="primary"
                                                size="md"
                                                loading={loading}
                                                disabled={false}
                                                block={true}
                                                className="form-button"
                                                text={{
                                                    label: "Continue",
                                                    size: 14,
                                                    weight: 'medium'
                                                }}
                                                icon={{
                                                    enable: true,
                                                    child: <></>
                                                }}
                                                onClick={(e) => handleReset(e)}
                                            />
                                        </FormField>

                                        <FormField className="mb-[1rem] text-center pt-[1rem] pb-[1rem]">
                                            <LinkButton
                                                text={{
                                                    label: 'New Talent?',
                                                    className: 'text-[13px]',
                                                    weight: 'regular',
                                                    color: 'pas-950'
                                                }}
                                                disabled={false}
                                                loading={false}
                                                icon={{
                                                    enable: false
                                                }}
                                                url=""
                                                onClick={(e) => { goTo('/register') }}
                                            />
                                            <LinkButton
                                                text={{
                                                    label: 'Create Account',
                                                    className: 'text-[13px]',
                                                    weight: 'regular',
                                                    color: 'pacb-500'
                                                }}
                                                disabled={false}
                                                loading={false}
                                                icon={{
                                                    enable: false
                                                }}
                                                url=""
                                                onClick={(e) => { goTo('/register') }}
                                            />
                                        </FormField>

                                    </div>

                                </>
                            }

                            {
                                step === 1 &&
                                <>
                                    <Divider show={false} padding={{ enable: true, top: 'pt-[2.5rem]', bottom: 'pb-[2.5rem]' }} />

                                    <div className="text-center">
                                        <h3 className="font-uncut-bold text-[25px] pas-950 tracking-[-1px]">Verify Account</h3>
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

                                        <Divider show={false} padding={{ enable: true, top: 'pt-[0.6rem]', bottom: 'pb-[0.6rem]' }} />

                                        <FormField className="">
                                            <Button
                                                type="primary"
                                                size="md"
                                                loading={loading}
                                                disabled={false}
                                                block={true}
                                                className="form-button"
                                                text={{
                                                    label: "Change Password",
                                                    size: 14,
                                                    weight: 'medium'
                                                }}
                                                icon={{
                                                    enable: true,
                                                    child: <></>
                                                }}
                                                onClick={(e) => handleReset(e)}
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
                                                onClick={(e) => { goTo('/register') }}
                                            />
                                        </FormField>

                                    </div>

                                </>
                            }

                            {
                                step === 2 &&
                                <>
                                    <Divider show={false} />

                                    <div className="w-[60%] mx-auto my-0">

                                        <Message
                                            type="success"
                                            message="Your password has been changed successfully. Proceed to login"
                                            title="Successful!"
                                            button={{
                                                enable: true,
                                                text: "Continue",
                                                onClick: (e) => { goTo('/login') }
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

export default ResetPassword;
