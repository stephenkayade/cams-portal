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
import helper from "../../utils/helper.util";
import PhoneInput from "../../components/partials/inputs/PhoneInput";
import { URL_FLAG, URL_REG_CALLBACK } from "../../utils/path.util";
import Message from "../../components/partials/dialogs/Message";

const RegisterPage = ({ }) => {

    const { goTo } = useGoTo()
    const { register } = useAuth()

    const [step, setStep] = useState<number>(0)
    const [form, setForm] = useState({
        email: '',
        password: '',
        userType: 'talent',
        callbackUrl: URL_REG_CALLBACK,
        phoneCode: '+234',
        phoneNumber: ''
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [alert, setAlert] = useState<IAlert>({
        name: '',
        type: 'success',
        show: false,
        message: ''
    });

    const handleRegister = async (e: any) => {

        if (e) { e.preventDefault(); }

        if (!form.email) {
            setAlert({ ...alert, type: 'error', show: true, name: 'email', message: 'email is required' });
        } 
        else if (!form.phoneNumber) {
            setAlert({ ...alert, type: 'error', show: true, name: 'phone', message: 'phone number is required' });
        } 
        else if (form.phoneNumber.length < 10 || form.phoneNumber.length > 11) {
            setAlert({ ...alert, type: 'error', show: true, name: 'phone', message: 'phone number cannot be less than 10-digit and cannot be greater than 11-digit' });
        } else if (!form.password) {
            setAlert({ ...alert, type: 'error', show: true, name: 'password', message: 'password is required' });
        } 
        else {

            setLoading(true);

            const response = await register(form)

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
                                        <h3 className="font-uncut-bold text-[25px] pas-950 tracking-[-1px]">Create Account</h3>
                                        <p className="mb-0 font-mona-light text-[14px] pag-600">Start mastering your craft, with confidence</p>
                                    </div>

                                    <Divider show={false} />

                                    <div className="w-[50%] mx-auto my-0 space-y-[0.65rem]">

                                        <Alert className="" type={alert.type} show={alert.show} message={alert.message} />

                                        <FormField className="">
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
                                                    title: "Email address"
                                                }}
                                                onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
                                            />
                                        </FormField>

                                        <FormField className="w-full">
                                            <PhoneInput
                                                label={{
                                                    required: true,
                                                    fontSize: 13,
                                                    title: "Phone Number"
                                                }}
                                                textInput={{
                                                    type: "email",
                                                    size: "rg",
                                                    showFocus: true,
                                                    autoComplete: false,
                                                    placeholder: "Ex. 080 0000 0000",
                                                    isError: alert.name === 'phone' ? true : false,
                                                    onChange: (e) => { setForm({ ...form, phoneNumber: e.target.value }) }
                                                }}
                                                filter={{
                                                    size: 'rg',
                                                    className: 'la-filter',
                                                    placeholder: "Country",
                                                    position: "bottom",
                                                    defaultValue: "NG",
                                                    menu: {
                                                        style: { minWidth: '200px' },
                                                        search: true,
                                                        fullWidth: false,
                                                        limitHeight: 'md'
                                                    },
                                                    items: helper.listCountries().map((x) => {
                                                        return {
                                                            label: x.name,
                                                            display: x.phone,
                                                            value: x.code,
                                                            image: `${URL_FLAG}/${x.code.toLowerCase()}.svg`
                                                        }
                                                    }),
                                                    noFilter: false,
                                                    onChange: (data) => {
                                                        const country = helper.getCountry(data.value)
                                                        if (country) {
                                                            setForm({ ...form, phoneCode: country.phoneCode })
                                                        }
                                                    }
                                                }}
                                            />
                                        </FormField>

                                        <FormField className="">
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
                                                onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
                                            />
                                        </FormField>

                                        <div className="w-full py-[20px] px-[21px] bg-pag-25 rounded-[5px]">
                                            <p className="font-mona-light text-[13px] pag-900">
                                            password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number</p>
                                        </div>

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
                                                    label: "Create Account",
                                                    size: 14,
                                                    weight: 'medium'
                                                }}
                                                icon={{
                                                    enable: true,
                                                    child: <></>
                                                }}
                                                onClick={(e) => handleRegister(e)}
                                            />
                                        </FormField>

                                        <FormField className="mb-[1rem] text-center pt-[1rem] pb-[1rem]">
                                            <LinkButton
                                                text={{
                                                    label: 'Have Account?',
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
                                                onClick={(e) => { goTo('/login') }}
                                            />
                                            <LinkButton
                                                text={{
                                                    label: 'Login',
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
                                            message="Your account has been created. Continue to access your account"
                                            title="Way to go!"
                                            button={{
                                                enable: true,
                                                text: "Continue",
                                                onClick: (e) => { goTo('/verify') }
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

export default RegisterPage;
