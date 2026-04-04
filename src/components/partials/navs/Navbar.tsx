import React, { useEffect, useState, useContext, useRef } from "react"
import { INavbar, ITopbar } from "../../../utils/interfaces.util";
import useGoTo from "../../../hooks/useGoTo";
import IconButton from "../buttons/IconButton";
import useGoBack from "../../../hooks/useGoBack";
import Icon from "../icons/Icon";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import NavDivider from "./NavDivider";
import useSidebar from "../../../hooks/useSidebar";
import UserAvatar from "../ui/UserAvatar";
import useUser from "../../../hooks/app/useUser";
import useAuth from "../../../hooks/app/useAuth";
import helper from "../../../utils/helper.util";

const Navbar = (props: INavbar) => {

    const {
        title,
        showBack,
        brand = true,
        sticky = true
    } = props;

    const dropRef = useRef<any>(null)

    const { goBack } = useGoBack()
    const { toDetailRoute } = useGoTo()
    const { logout, redirect } = useAuth()
    const { talent, user, getUser, getTalent } = useUser()


    const [avatarDrop, setAvatarDrop] = useState<boolean>(false)

    useEffect(() => {
        init()
    }, [])

    // use-effect to close avatar-drop when clicking outside
    useEffect(() => {

        const dropBarOut = (e: any) => {
            if (!dropRef.current) {
                return;
            }

            if (!dropRef.current.contains(e.target)) {
                setAvatarDrop(false)
            }
        }

        window.addEventListener('mousedown', dropBarOut, true)

        return () => {
            window.removeEventListener('mousedown', dropBarOut)
        }

    }, [])

    const init = async () => {

        redirect(['superadmin', 'admin']);

        if (helper.isEmpty(user, 'object')) {
            await getUser()
        }

        if (helper.isEmpty(talent, 'object')) {
            await getTalent()
        }
    }

    const tc = () => {

        let result = `w-[100%] px-0 py-0 h-[80px] max-h-[80px] border-b bdr-pag-100`;

        if (sticky) {
            result = result + ` fixed z-[800] right-0 left-0 top-0 bg-white`
        }

        return result

    }

    const tw = () => {

        let result = `w-[100%] h-[100%] max-h-[100%] flex items-center py-0 px-[2rem]`;

        return result

    }

    const adc = () => {

        let result = `w-[200px] min-h-[200px] bg-white shadow-subtle border bdr-pag-100 py-[0.55rem] px-[1rem] absolute z-[1000] right-0 top-0 mt-[2rem] rounded-[8px]`;
        result = result + ` transition-all duration-[0.15s] ease`

        if (avatarDrop) {
            result = result + `  opacity-[1] visible transform translate-y-[30px]`
        } else {
            result = result + ` opacity-[0] invisible transform translate-y-[90px]`
        }

        return result

    }

    return (
        <>
            <div className={`topbar ${tc()}`}>

                <div className={`topbar-wrapper ${tw()}`}>

                    <div className="page-bar flex items-center gap-x-[1.5rem]">

                        {
                            showBack &&
                            <IconButton
                                size="min-w-[1.8rem] min-h-[1.8rem]"
                                className="ml-auto bg-pab-50 bgh-pab-100"
                                icon={{
                                    type: 'polio',
                                    name: 'arrow-left',
                                    size: 16,
                                    className: 'pab-800'
                                }}
                                onClick={(e) => {
                                    goBack()
                                }}
                            />
                        }
                        {title &&
                            <>
                                <div className="w-[1px] bg-pag-300 h-[17px]"></div>
                                <h3 className="font-mona-medium mrgb0 text-[16px] pas-950">{title}</h3>
                            </>
                        }
                        {
                            brand &&
                            <>
                                <div className="w-[1px] bg-pag-300 h-[17px]"></div>
                                <div>
                                    <img className="logo w-[120px]" src="../../../images/assets/logo.svg" alt="logo" loading="lazy" />
                                </div>
                            </>
                        }


                    </div>

                    <div className="action-bar flex items-center ml-auto gap-x-[1.5rem] relative">

                        <Link
                            onClick={(e) => { setAvatarDrop(!avatarDrop) }}
                            to=""
                            className="user-bar ml-auto relative inline-flex items-center gap-x-[0.2rem]">
                            <UserAvatar
                                size="w-[40px] h-[40px]"
                                className="topbar-avatar"
                                avatar={talent.avatar ? talent.avatar : '../../../images/assets/avatar.png'}
                                name={'User Avatar'}
                            />
                            <Icon
                                type="polio"
                                name="nav-arrow-right"
                                clickable={false}
                                size={18}
                                position="relative"
                                style={{ transform: 'rotate(90deg)', top: '3px', color: 'var(--pas-900)' }}
                            />
                        </Link>

                        <div ref={dropRef} className={`user-bardrop ${adc()}`}>
                            <NavItem
                                type="topbar"
                                label={'Profile'}
                                icon={{ enable: true, name: 'user', className: 'pdr1' }}
                                active={false}
                                path={''}
                                onClick={(e) => {
                                    toDetailRoute(e, { subroute: 'profile', route: 'account' })
                                    setTimeout(() => {
                                        setAvatarDrop(false)
                                    }, 300)
                                }}
                            />
                            <NavItem
                                type="topbar"
                                label={'Tasks'}
                                icon={{ enable: true, name: 'user', className: 'pdr1' }}
                                active={false}
                                path={''}
                                onClick={(e) => {
                                    toDetailRoute(e, { subroute: 'tasks', route: 'projects' })
                                    setTimeout(() => {
                                        setAvatarDrop(false)
                                    }, 300)
                                }}
                            />
                            <NavItem
                                type="topbar"
                                label={'Billing'}
                                icon={{ enable: true, name: 'user', className: 'pdr1' }}
                                active={false}
                                path={''}
                                onClick={(e) => {
                                    toDetailRoute(e, { subroute: 'billing', route: 'account' })
                                    setTimeout(() => {
                                        setAvatarDrop(false)
                                    }, 300)
                                }}
                            />
                            <NavItem
                                type="topbar"
                                label={'Settings'}
                                icon={{ enable: true, name: 'user', className: 'pdr1' }}
                                active={false}
                                path={''}
                                onClick={(e) => {
                                    toDetailRoute(e, { subroute: 'security', route: 'settings' })
                                    setTimeout(() => {
                                        setAvatarDrop(false)
                                    }, 300)
                                }}
                            />
                            <NavDivider type="sidebar" show={true} />
                            <NavItem
                                type="topbar"
                                label={'Logout'}
                                icon={{ enable: true, name: 'user', className: 'pdr1' }}
                                active={false}
                                path={''}
                                onClick={(e) => {
                                    logout()
                                    setTimeout(() => {
                                        setAvatarDrop(false)
                                    }, 300)
                                }}
                            />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
};

export default Navbar;
