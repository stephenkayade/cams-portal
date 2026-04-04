import React, { useEffect, useState, useContext, useRef } from "react"
import useSidebar from "../../../../hooks/useSidebar";
import CardUI from "../../../../components/partials/ui/CardUI";
import useUser from "../../../../hooks/app/useUser";
import IconButton from "../../../../components/partials/buttons/IconButton";
import Fileog from "../../../../components/partials/dialogs/Fileog";
import Divider from "../../../../components/partials/Divider";
import FormField from "../../../../components/partials/inputs/FormField";
import TextInput from "../../../../components/partials/inputs/TextInput";
import useToast from "../../../../hooks/useToast";
import PhoneInput from "../../../../components/partials/inputs/PhoneInput";
import helper from "../../../../utils/helper.util";
import Icon from "../../../../components/partials/icons/Icon";
import Filter from "../../../../components/partials/drops/Filter";
import Button from "../../../../components/partials/buttons/Button";
import { URL_FLAG } from "../../../../utils/path.util";
import { IFileogRef } from "../../../../utils/interfaces.util";

const ProfilePage = ({ }) => {

    const avaRef = useRef<IFileogRef>(null)
    const genRef = useRef<any>(null)
    const counRef = useRef<any>(null)

    useSidebar({ type: 'page', init: true })
    const { talent, user, updateTalent, getTalent, loading: userLoading } = useUser()
    const { toast, setToast, clearToast } = useToast()

    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        phoneCode: '',
        phoneNumber: '',
        countryCode: '',
        username: '',
        gender: '',
        avatar: ''
    })

    useEffect(() => {

    }, [])

    const handleUpdate = async (e: any) => {

        if (e) { e.preventDefault() }

        setLoading(true)

        const response = await updateTalent(form);

        if (!response.error) {
            setLoading(false)
            setToast({ show: true, type: 'success', title: 'Successful', message: 'Changes saved successfully', position: 'top-right' })
            getTalent()
        }

        if (response.error) {

            setLoading(false)

            if (response.errors.length > 0) {
                setToast({ show: true, type: 'error', title: 'Error', message: response.errors.join(','), error: 'all', position: 'top-right' })
            } else {
                setToast({ show: true, type: 'error', title: 'Error', message: response.message, error: 'all', position: 'top-right' })
            }

        }

        setTimeout(() => {
            setToast({ ...toast, show: false, error: '' })
        }, 1500)

    }

    return (
        <>

            <CardUI>

                <form className="w-[45%] mx-auto my-0 min-h-[30vh] py-[2rem] space-y-[2rem]">

                    <div className="w-full space-y-[0.3rem]">
                        <h3 className="text-[15px] pas-950 font-mona-medium">Personal Information</h3>
                        <p className="font-mona-light pag-600 text-[13px]">Update your personal information</p>
                    </div>

                    <div className="w-full flex items-center gap-x-[2.5rem]">

                        <Fileog
                            ref={avaRef}
                            type="image"
                            accept={['image/jpeg', 'image/jpg', 'image/png']}
                            sizeLimit={8}
                            onSelect={(file) => {
                                const selectedFile = Array.isArray(file) ? file[0] : file;
                                if (selectedFile) {
                                    setForm({ ...form, avatar: selectedFile.base64 })
                                }
                            }}
                        />

                        <div
                            className="min-w-[86px] min-h-[86px] bg-pag-100 rounded-full flex items-center justify-center full-bg relative"
                            style={{ backgroundImage: `url("${form.avatar ? form.avatar : talent.avatar ? talent.avatar : ""}")` }}>
                            {!userLoading &&
                                <IconButton
                                    size="min-w-[1.8rem] min-h-[1.8rem]"
                                    className="ml-auto bg-color-black color-white absolute bottom-[0px] right-[-0.1rem]"
                                    icon={{
                                        type: 'polio',
                                        name: 'edit',
                                        size: 16,
                                    }}
                                    onClick={(e) => {
                                        if (avaRef.current) {
                                            avaRef.current.open()
                                        }
                                    }}
                                />
                            }
                            {!talent.avatar && <Icon name="media-image" type="polio" size={16} className="pab-900" />}
                        </div>

                        <div className="cursor-pointer" onClick={(e) => { if (avaRef.current) { avaRef.current.open(e) } }}>
                            <h3 className="font-mona text-[14px] pas-950">Profile Picture</h3>
                            <p className="font-mona-light pag-400 text-[13px]">JPEG or JPG. 5MB Max</p>
                        </div>

                    </div>

                    <div className={`w-full space-y-[1rem] ${userLoading ? 'disabled-light' : ''}`}>

                        <FormField className="flex items-center gap-x-[1.2rem]">

                            <div className="flex-col w-1/2">

                                <TextInput
                                    type="text"
                                    size="sm"
                                    showFocus={true}
                                    autoComplete={false}
                                    placeholder="Ex. Benson"
                                    defaultValue={talent.firstName}
                                    isError={toast.error === 'firstname' ? true : false}
                                    label={{
                                        required: false,
                                        fontSize: 13,
                                        title: "First Name"
                                    }}
                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                />

                            </div>

                            <div className="flex-col w-1/2">

                                <TextInput
                                    type="text"
                                    size="sm"
                                    showFocus={true}
                                    autoComplete={false}
                                    placeholder="Ex. Bullocks"
                                    defaultValue={talent.lastName}
                                    isError={toast.error === 'lastname' ? true : false}
                                    label={{
                                        required: false,
                                        fontSize: 13,
                                        title: "Last Name"
                                    }}
                                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                />

                            </div>

                        </FormField>

                        <FormField className="w-full">

                            <PhoneInput
                                gap="gap-x-[1.2rem]"
                                width="w-[25%]"
                                label={{
                                    required: false,
                                    fontSize: 13,
                                    title: "Phone Number"
                                }}
                                textInput={{
                                    type: "text",
                                    size: "sm",
                                    showFocus: true,
                                    autoComplete: false,
                                    placeholder: "Ex. 080 0000 0000",
                                    isError: alert.name === 'phone' ? true : false,
                                    defaultValue: user.phoneNumber,
                                    onChange: (e) => { setForm({ ...form, phoneNumber: e.target.value }) }
                                }}
                                filter={{
                                    size: 'sm',
                                    className: 'la-filter',
                                    placeholder: "Country",
                                    position: "bottom",
                                    defaultValue: user.country && user.country.code2 ? user.country.code2 : "NG",
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

                            <TextInput
                                type="text"
                                size="sm"
                                showFocus={true}
                                autoComplete={false}
                                placeholder="Ex. Benson"
                                defaultValue={talent.username}
                                isError={toast.error === 'username' ? true : false}
                                icon={{
                                    enable: true,
                                    position: 'left',
                                    child: <Icon name="at-sign" type="feather" size={16} className="pag-500" />
                                }}
                                label={{
                                    required: true,
                                    fontSize: 13,
                                    title: "Pacitude Tag"
                                }}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                            />

                        </FormField>

                        <FormField className="flex items-center gap-x-[1.2rem]">

                            <div className="flex-col w-1/2">

                                <label className={`mrgb0`}>
                                    <span className={`font-mona pag-900 text-[13px]`}>Gender</span>
                                </label>

                                <Filter
                                    ref={genRef}
                                    size='sm'
                                    className='la-filter'
                                    placeholder="Gender"
                                    position="bottom"
                                    defaultValue={talent.gender}
                                    menu={{
                                        style: {},
                                        search: false,
                                        fullWidth: true,
                                        limitHeight: 'sm'
                                    }}
                                    items={[
                                        { label: 'Male', value: 'male' },
                                        { label: 'Female', value: 'female' }
                                    ]}
                                    noFilter={false}
                                    onChange={(data) => {
                                        setForm({ ...form, gender: data.value })
                                    }}
                                />

                            </div>

                            <div className="flex-col w-1/2">

                                <label className={`mrgb0`}>
                                    <span className={`font-mona pag-900 text-[13px]`}>Country of Residence</span>
                                </label>

                                <Filter
                                    ref={counRef}
                                    size='sm'
                                    className='la-filter'
                                    placeholder="Country"
                                    position="bottom"
                                    defaultValue={talent.homeCountry?.code2 || ''}
                                    menu={{
                                        style: {},
                                        search: true,
                                        fullWidth: true,
                                        limitHeight: 'sm'
                                    }}
                                    items={
                                        helper.listCountries().map((x) => {
                                            return {
                                                label: helper.capitalizeWord(x.name),
                                                value: x.code,
                                                image: `${URL_FLAG}/${x.code.toLowerCase()}.svg`
                                            }
                                        })
                                    }
                                    noFilter={false}
                                    onChange={async (data) => {
                                        setForm({ ...form, countryCode: data.value })
                                    }}
                                />

                            </div>

                        </FormField>

                        <Divider show={false} padding={{ enable: true, top: 'pt-[1rem]' }} />

                        <FormField className="w-full flex items-center">

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
                                onClick={(e) => handleUpdate(e)}
                            />

                        </FormField>

                    </div>

                </form>
            </CardUI>
        </>
    )
};

export default ProfilePage;
