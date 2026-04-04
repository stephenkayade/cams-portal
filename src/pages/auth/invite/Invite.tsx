import React, { useEffect, useState, useContext } from "react"
import Divider from "../../../components/partials/Divider";
import Alert from "../../../components/partials/ui/Alert";
import { IAlert } from "../../../utils/interfaces.util";
import useGoTo from "../../../hooks/useGoTo";
import FormField from "../../../components/partials/inputs/FormField";
import TextInput from "../../../components/partials/inputs/TextInput";
import PasswordInput from "../../../components/partials/inputs/PasswordInput";
import Button from "../../../components/partials/buttons/Button";
import LinkButton from "../../../components/partials/buttons/LinkButton";
import useAuth from "../../../hooks/app/useAuth";
import Filter from "../../../components/partials/drops/Filter";
import helper from "../../../utils/helper.util";
import PhoneInput from "../../../components/partials/inputs/PhoneInput";
import { URL_ACTIVATE, URL_REG_CALLBACK } from "../../../utils/path.util";
import Icon from "../../../components/partials/icons/Icon";
import Message from "../../../components/partials/dialogs/Message";
import EmptyState from "../../../components/partials/dialogs/EmptyState";
import useUser from "../../../hooks/app/useUser";
import { useParams } from "react-router-dom";

const InvitePage = ({ }) => {

    const { token } = useParams()

    const { goTo } = useGoTo()
    const { acceptInvite } = useUser();
    const { forcePassword, logAuthCredentials } = useAuth();

    const [step, setStep] = useState<number>(0)
    const [form, setForm] = useState({
        password: '',
        confirm: '',
        email: '',
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<IAlert>({
        name: '',
        type: 'success',
        show: false,
        message: ''
    });

    useEffect(() => {

        if(token){
            handleAccept(token)
        }

    }, [token])

    const handleAccept = async (token: string) => {

        setLoading(true);
        const response = await acceptInvite({ token: token ? token : '', type: 'invite' })

        if (!response.error) {

            logAuthCredentials({
                id: response.data._id,
                token: response.token!,
                userType: response.data.userType
            });

            // capture the user email
            setForm({ ...form, email: response.data.email })

            setStep(1);
            setLoading(false);

        }

        if (response.error) {

            setLoading(false)
            setStep(0);

            if (response.errors.length > 0) {
                setAlert({ ...alert, type: 'error', show: true, name: '', message: response.errors.join(',') });
            } else {
                setAlert({ ...alert, type: 'error', show: true, name: '', message: response.message });
            }

        }

    }

    const handleChangePassword = async (e: any) => {

        if (e) { e.preventDefault(); }

        setLoading(true);

        const response = await forcePassword({
            email: form.email,
            password: form.password
        });

        if (!response.error) {

            if (response.data.onboard && response.data.onboard.stage === 'pending') {
                goTo('/dashboard/onboard')
            } else {
                goTo('/dashboard')
            }

            // setStep(2);
            setLoading(false);

        }

        if (response.error) {

            setLoading(false)
            setStep(0);

            if (response.errors.length > 0) {
                setAlert({ ...alert, type: 'error', show: true, name: '', message: response.errors.join(',') });
            } else {
                setAlert({ ...alert, type: 'error', show: true, name: '', message: response.message });
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
                                    <Divider show={false} padding={{ enable: true, top: 'pt-[2rem]', bottom: 'pb-[2rem]' }} />

                                    <div className="w-[60%] mx-auto my-0 text-center space-y-[1rem]">

                                        <div className="text-center">
                                            <h3 className="font-uncut-bold text-[25px] pas-950 tracking-[-1px]">Accept Invite</h3>
                                            <p className="mb-0 font-mona-light text-[14px] pag-600">Join Pacitude as a Talent</p>
                                        </div>

                                        {
                                            loading &&
                                            <EmptyState className="min-h-[40vh]" noBound={true}>
                                                <span className="loader lg primary"></span>
                                            </EmptyState>
                                        }

                                        {
                                            !loading &&
                                            <>
                                                {
                                                    alert.show === true &&
                                                    <EmptyState bgColor="bg-par-50" className="min-h-[40vh]" noBound={true}>
                                                        <div className="mb-[1rem]">
                                                            <Icon type="feather" name="slash" className="par-600" size={80} />
                                                        </div>
                                                        <p className="mb-0 font-mona text-[16px] pag-900">Your invite link is invalid.</p>
                                                    </EmptyState>
                                                }
                                            </>
                                        }


                                    </div>

                                </>
                            }

                            {
                                step === 1 &&
                                <>
                                    <Divider show={false} padding={{ enable: true, top: 'pt-[2.5rem]', bottom: 'pb-[2.5rem]' }} />

                                    <form onSubmit={(e) => { e.preventDefault() }} className="w-[50%] mx-auto my-0 space-y-[1rem]">

                                        <div className="text-center mb-[2rem]">
                                            <h3 className="font-uncut-bold text-[25px] pas-950 tracking-[-1px]">Change Your Password</h3>
                                            <p className="mb-0 font-mona-light text-[14px] pag-600">Set a preferred password</p>
                                        </div>

                                        <Alert className="" type={alert.type} show={alert.show} message={alert.message} />

                                        <FormField className="mb-[1rem]">
                                            <PasswordInput
                                                showFocus={true}
                                                autoComplete={false}
                                                placeholder="••••••••"
                                                isError={alert.name === 'password' ? true : false}
                                                label={{
                                                    required: true,
                                                    fontSize: 13,
                                                    title: "New Password"
                                                }}
                                                onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                                            />
                                        </FormField>

                                        <FormField className="mb-[1rem]">
                                            <PasswordInput
                                                showFocus={true}
                                                autoComplete={false}
                                                placeholder="••••••••"
                                                isError={alert.name === 'confirm' ? true : false}
                                                label={{
                                                    required: true,
                                                    fontSize: 13,
                                                    title: "Confirm Password"
                                                }}
                                                onChange={(e) => { setForm({ ...form, confirm: e.target.value }) }}
                                            />
                                        </FormField>

                                        <Divider show={false} padding={{ enable: true, top: 'pt-[0.6rem]', bottom: 'pb-[0.6rem]' }} />

                                        <FormField className="mb-[1rem]">
                                            <Button
                                                type="primary"
                                                size="md"
                                                loading={loading}
                                                disabled={false}
                                                block={true}
                                                className="form-button"
                                                text={{
                                                    label: "Save Changes",
                                                    size: 14,
                                                    weight: 'medium'
                                                }}
                                                icon={{
                                                    enable: true,
                                                    child: <></>
                                                }}
                                                onClick={(e) => handleChangePassword(e)}
                                            />
                                        </FormField>

                                    </form>
                                </>
                            }

                            {
                                step === 2 &&
                                <>
                                    <Divider show={false} />

                                    <div className="w-[60%] mx-auto my-0">

                                        <Message
                                            type="success"
                                            message="Your account has been verified. Continue to access your account"
                                            title="Way to go!"
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

export default InvitePage;
