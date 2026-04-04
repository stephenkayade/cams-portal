import React, { useEffect, useState, useContext, MouseEvent } from "react"
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
import ForgotPassword from "../../components/app/auth/ForgotPassword";

const LoginPage = ({ }) => {

    const { goTo } = useGoTo()
    const { login } = useAuth()

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        method: 'email',
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [alert, setAlert] = useState<IAlert>({
        name: '',
        type: 'success',
        show: false,
        message: ''
    });

    useEffect(() => {

    }, [])

    const toggleShow = (e: MouseEvent<HTMLElement>) => {
        if (e) e.preventDefault()
        setShow(!show)
    }

    const handleLogin = async (e: any) => {

        if (e) { e.preventDefault(); }

        if (!loginData.email) {
            setAlert({ ...alert, type: 'error', show: true, name: 'email', message: 'email is required' });
        } else if (!loginData.password) {
            setAlert({ ...alert, type: 'error', show: true, name: 'password', message: 'password is required' });
        } else {

            setLoading(true);

            const response = await login({
                email: loginData.email,
                password: loginData.password,
                method: loginData.method as any
            })

            if (!response.error) {
                setLoading(false)
                goTo('/dashboard')
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
            <section className="auth-page w-full min-h-[100vh] flex flex-col lg:items-center lg:flex-row gap-x-0">

                <div className="left-halve w-full lg:w-[52%] px-[1rem] sm:px-[1.5rem] py-[1.5rem] h-full flex items-center flex-col pt-[3rem] lg:pt-[0rem]">

                    <div className="w-full h-full relative">

                        <Divider show={false} padding={{ enable: true, top: 'pt-[1rem] lg:pt-0', bottom: 'pb-[1rem] lg:pb-[2.5rem]' }} />

                        <div className="">

                            <div className="text-center">
                                <h3 className="font-uncut-bold text-[22px] lg:text-[25px] pas-950 tracking-[-1px]">Welcome Back</h3>
                                <p className="mb-0 font-mona-light text-[14px] pag-600">Login into your account</p>
                            </div>

                            <Divider show={false} />

                            <div className="w-full max-w-[400px] lg:w-[50%] mx-auto my-0">

                                <Alert className="" type={alert.type} show={alert.show} message={alert.message} />

                                <FormField className="mb-[1rem]">
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
                                        onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }}
                                    />
                                </FormField>

                                <FormField className="mb-[1rem]">
                                    <PasswordInput
                                        showFocus={true}
                                        autoComplete={false}
                                        placeholder="••••••••"
                                        isError={alert.name === 'password' ? true : false}
                                        label={{
                                            required: true,
                                            fontSize: 13,
                                            title: "Password"
                                        }}
                                        forgot={{ enable: true, onClick: (e) => toggleShow(e) }}
                                        onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}
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
                                            label: "Login",
                                            size: 14,
                                            weight: 'medium'
                                        }}
                                        icon={{
                                            enable: true,
                                            child: <></>
                                        }}
                                        onClick={(e) => handleLogin(e)}
                                    />
                                </FormField>

                                <FormField className="mb-[1rem] text-center pt-[1rem] pb-[1rem]">
                                    <LinkButton
                                        text={{
                                            label: 'New User?',
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

                        </div>



                        <div className="w-full text-center relative lg:absolute lg:-bottom-10 bottom-[1rem] mt-[2rem] lg:mt-0">
                            <p className="font-mona text-[13px] pag-300">Copyright © Transfiguration Ark Revival Ministry</p>
                        </div>

                    </div>

                </div>

                <div className="right-halve hidden lg:flex lg:w-[48%] pr-[1.5rem] py-[1.5rem] pl-0 h-full lg:h-[95vh]">
                    <div className="w-full h-[100%] rounded-[20px] full-bg relative" style={{ backgroundImage: `url("../../../images/assets/bg@auth.webp")` }}>

                        <div className="w-full flex items-center min-h-[100px] px-[1rem] lg:pt-[2rem]">
                            <img src="../../../images/assets/logo.png" className="w-[150px]" alt="logo.png" />
                        </div>

                        <div className="w-full px-[3rem] absolute left-0 bottom-[5rem] space-y-[1.2rem]">
                            <h1 className="font-uncut-bold pas-950 text-[60px] leading-[58px] tracking-[-2px]">It's the season of the mighty congregation</h1>
                        </div>

                    </div>
                </div>

            </section>

            <ForgotPassword
                show={show}
                flattened={true}
                title="Forgot Password"
                closeModal={toggleShow}
                size="xlg"
            />
        </>
    )
};

export default LoginPage;
