import React, { useEffect, useState, useContext, useRef } from "react"
import EmptyState from "../../../components/partials/dialogs/EmptyState";
import useSidebar from "../../../hooks/useSidebar";
import useUser from "../../../hooks/app/useUser";
import UserAvatar from "../../../components/partials/ui/UserAvatar";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import CardUI from "../../../components/partials/ui/CardUI";
import storage from "../../../utils/storage.util";
import Divider from "../../../components/partials/Divider";
import FormField from "../../../components/partials/inputs/FormField";
import TextInput from "../../../components/partials/inputs/TextInput";
import Button from "../../../components/partials/buttons/Button";
import Icon from "../../../components/partials/icons/Icon";
import PasswordInput from "../../../components/partials/inputs/PasswordInput";
import LinkButton from "../../../components/partials/buttons/LinkButton";
import useToast from "../../../hooks/useToast";

const SecuritySettingsPage = ({ }) => {

    const currRef = useRef<any>(null);
    const newRef = useRef<any>(null);
    const codeRef = useRef<any>(null);

    useSidebar({ type: 'page', init: true });
    const { getFullname, loading, sendVerificationCode, changePassword } = useUser()
    const { toast, setToast } = useToast();

    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        code: ''
    })

    useEffect(() => {

    }, [])

    const configTab = (e: any, val: any) => {
        if (e) { e.preventDefault(); }
        storage.keep('secuirty-settings-tab', val.toString())
    }

    const handleSendCode = async (e: any) => {
        if (e) { e.preventDefault() }

        const response = await sendVerificationCode();

        if (!response.error) {
            setToast({ show: true, type: 'success', title: 'Successful', message: 'Code sent successfully', position: 'top-right' })
        }

        if (response.error) {
            if (response.errors.length > 0) {
                setToast({ show: true, type: 'error', title: 'Error', message: response.errors.join(','), error: 'all', position: 'top-right' })
            } else {
                setToast({ show: true, type: 'error', title: 'Error', message: response.message, error: 'all', position: 'top-right' })
            }
        }

        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 1800)
    }

    const handleChangePassword = async (e: any) => {
        if (e) { e.preventDefault() }

        if (!form.currentPassword) {
            setToast({ show: true, type: 'error', title: 'Error', message: 'Current password is required', error: 'all', position: 'top-right' })
        } else if (!form.newPassword) {
            setToast({ show: true, type: 'error', title: 'Error', message: 'New password is required', error: 'all', position: 'top-right' })
        } else if (!form.code) {
            setToast({ show: true, type: 'error', title: 'Error', message: 'Verification code is required', error: 'all', position: 'top-right' })
        } else {

            const response = await changePassword({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
                code: form.code
            });

            if (!response.error) {

                currRef.current.clear()
                newRef.current.clear()
                codeRef.current.clear()

                setToast({ show: true, type: 'success', title: 'Successful', message: 'Password changed successfully', position: 'top-right' })

            }

            if (response.error) {
                if (response.errors.length > 0) {
                    setToast({ show: true, type: 'error', title: 'Error', message: response.errors.join(','), error: 'all', position: 'top-right' })
                } else {
                    setToast({ show: true, type: 'error', title: 'Error', message: response.message, error: 'all', position: 'top-right' })
                }
            }

        }


        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 1800)
    }

    return (
        <>
            <div className="w-full flex items-center">

                <div className="flex items-center gap-x-[1.2rem]">

                    {/* <UserAvatar
                        size="min-w-[65px] min-h-[65px]"
                        avatar={talent.avatar}
                        name={getFullname(talent)}
                    />

                    <div className="p-0">
                        <h3 className="font-mona-medium text-[16px] pas-950">{getFullname(talent)}</h3>
                        <p className="font-mona-light pag-400 text-[14px]">@{talent.username}</p>
                    </div> */}

                </div>

            </div>

            <Divider show={false} />

            <CardUI>
                <Tabs defaultIndex={parseInt(storage.fetch('secuirty-settings-tab'))}>
                    <TabList>
                        <Tab onClick={(e: any) => { configTab(e, 0); }}>Change Password</Tab>
                        <Tab onClick={(e: any) => { configTab(e, 1); }}>Verifications</Tab>
                    </TabList>

                    <TabPanel tabIndex={0}>

                        <form onSubmit={(e) => { e.preventDefault() }}
                            className={`w-full py-[3rem] ${loading ? 'disabled-light' : ''}`}>

                            <div className="w-[37%] mx-auto my-0 space-y-[1rem]">
                                <FormField className="w-full">

                                    <PasswordInput
                                        ref={currRef}
                                        showFocus={true}
                                        autoComplete={false}
                                        placeholder="••••••••"
                                        isError={alert.name === 'password' ? true : false}
                                        label={{
                                            required: true,
                                            fontSize: 13,
                                            title: "Current Password"
                                        }}
                                        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                                    />

                                </FormField>

                                <FormField className="w-full">

                                    <PasswordInput
                                        ref={newRef}
                                        showFocus={true}
                                        autoComplete={false}
                                        placeholder="••••••••"
                                        isError={alert.name === 'password' ? true : false}
                                        label={{
                                            required: true,
                                            fontSize: 13,
                                            title: "New Password"
                                        }}
                                        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                                    />

                                </FormField>

                                <FormField className="w-full">

                                    <TextInput
                                        ref={codeRef}
                                        type="text"
                                        size="sm"
                                        showFocus={true}
                                        autoComplete={false}
                                        placeholder="Ex. 000 000"
                                        defaultValue={''}
                                        isError={false}
                                        label={{
                                            required: true,
                                            fontSize: 13,
                                            title: "Enter verification code"
                                        }}
                                        onChange={(e) => setForm({ ...form, code: e.target.value })}
                                    />

                                </FormField>

                                <FormField className="w-full flex items-center pt-[1rem]">

                                    <LinkButton
                                        text={{
                                            label: 'Send Code',
                                            className: 'text-[14px]',
                                            weight: 'medium',
                                            color: 'pacb-500'
                                        }}
                                        disabled={false}
                                        loading={loading}
                                        icon={{
                                            enable: true,
                                            child: <Icon name="nav-arrow-right" type="polio" size={16} className="relative top-[0.1rem] pacb-500" />
                                        }}
                                        onClick={(e) => handleSendCode(e)}
                                    />

                                    <Button
                                        type="primary"
                                        semantic="info"
                                        size="rg"
                                        loading={loading}
                                        disabled={false}
                                        block={false}
                                        className="form-button min-w-[150px] ml-auto"
                                        icon={{
                                            enable: true,
                                            child: <Icon name="arrow-right" type="polio" size={16} />
                                        }}
                                        text={{
                                            label: "Save Changes",
                                            size: 13,
                                            weight: 'medium'
                                        }}
                                        onClick={(e) => handleChangePassword(e)}
                                    />

                                </FormField>
                            </div>


                        </form>

                    </TabPanel>

                    <TabPanel tabIndex={1}>
                        <EmptyState className="min-h-[50vh] mt-[2rem] mb-[1rem] full-bg" noBound={true} style={{ backgroundImage: `url("../../../images/assets/bg@grad_01.webp")` }}>
                            <span className="font-mona pag-800 text-[15px]">Your verification settings will appear here soon</span>
                        </EmptyState>
                    </TabPanel>

                </Tabs>
            </CardUI>
        </>
    )
};

export default SecuritySettingsPage;
