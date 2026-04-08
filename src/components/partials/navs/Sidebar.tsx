import { useEffect, useState, Fragment } from "react"
import { ISidebar } from "../../../utils/interfaces.util";
import storage from "../../../utils/storage.util";
import routes from "../../../routes/sidebar.route";
import helper from "../../../utils/helper.util";
import useGoTo from "../../../hooks/useGoTo";
import AxiosService from "../../../services/axios.service";
import NavItem from "./NavItem";
import useSidebar from "../../../hooks/useSidebar";
import useAuth from "../../../hooks/app/useAuth";
import useUser from "../../../hooks/app/useUser";

const SideBar = (props: ISidebar) => {

    const {
        collapsed
    } = props;

    const { goTo, getRoute, computePath, getRouteAction } = useGoTo()
    const { sidebar, setSidebar, initSidebar } = useSidebar({})
    const { getUser, user } = useUser()
    const { redirect } = useAuth()

    const [isOpen, setIsOpen] = useState<boolean>(true);
    const activeRouteName = sidebar?.route?.name || routes[0]?.name;

    useEffect(() => {
        initSidebar()
    }, [])

    useEffect(() => {
        init()
    }, [user])

    const init = async () => {

        redirect(['admin', 'superadmin']);

        if (!user || helper.isEmpty(user, 'object')) {
            await getUser()
        }
    }

    const handleRoute = (e: any, nav: { parent: string, name: string, path: string, action: string }) => {

        e.preventDefault();

        const route = getRoute(nav.parent);
        const subroute = getRoute(nav.parent, nav.name);

        if (nav.action === 'navigate' && nav.path) {

            goTo(nav.path);
            setSidebar({
                collapsed: collapsed,
                route: route,
                subroutes: [],
                inroutes: [],
                isOpen: false
            });

            // store current route name in local storage
            storage.keep('route.name', route.name);

            if (subroute && route.name !== subroute.name) {
                storage.keep('route.subroute', subroute.name);
            } else {
                storage.deleteItem('route.subroute')
            }

        }

        else if (nav.action === 'logout') {
            goTo('/login');
            AxiosService.logout()
        }

    }

    // sidebar classes
    const sc = () => {

        // main class
        let result = `sidebar fixed flex left-0 top-0 h-[100vh] overflow-x-clip hide-scroll`;

        // width
        if (collapsed) {
            result = result + ` min-w-[70px] w-[80px] max-w-[80px]`;
        } else {
            result = result + ` min-w-[70px] w-[260px] max-w-[260px]`;
        }

        // background color
        result = result + ` bg-pag-25`;

        // z-index
        result = result + ` z-[1000]`;

        // transition
        result = result + ` transition-all duration-[0.2s] ease`;

        if (isOpen) {
            result = result + ` transform translate-x-0`;
        } else {
            result = result + ` transform translate-x-[-270px]`;
        }

        // border
        result = result + ` border-r bdr-pag-50`;

        return result;
    }

    const spc = () => {

        let pm = `relative h-[100%] w-[100%] align-top bg-pag-25`;
        let ph = `bar-head w-[100%] flex items-center p-[1.25rem] relative top-0 border-b bdr-pag-100 h-[80px] max-h-[80px]`;
        let pb = `bar-body w-[100%] p-[1.25rem]`;

        return { pm, ph, pb };
    }

    const nc = () => {

        let nm = `p-0 m-0 w-[100%] list-none text-center hide-scroll h-[80vh] overflow-x-hidden overflow-y-scroll`;
        let ns = `p-0 m-0 w-[100%] list-none text-center hide-scroll`;
        return { nm, ns }

    }

    return (
        <>
            <div className={`sidebar ${sc()}`}>

                <div className={`sidebar-primary ${spc().pm}`}>

                    <div className={`bar-head ${spc().ph}`}>
                        {!sidebar.collapsed && <img className="logo w-[100px]" src="../../../images/assets/logo.png" alt="logo" loading="lazy" />}
                        {sidebar.collapsed && <img className="logo-icon w-[40px]" src="../../../images/assets/logo.png" alt="logo" loading="lazy" />}
                    </div>

                    <div className={`bar-body ${spc().pb}`}>

                        <ul className={`nav-list ${nc().nm}`}>

                            {
                                routes.map((route, index) =>
                                    <Fragment key={route.name + index + 1}>

                                        {
                                            route.name !== 'divider' &&
                                            <NavItem
                                                type="sidebar"
                                                label={route.title ? route.title : helper.capitalize(route.name)}
                                                icon={{ enable: true, name: route.iconName!, className: 'pdr1' }}
                                                active={activeRouteName === route.name ? true : false}
                                                path={computePath(route.url)}
                                                onClick={(e) => 
                                                    handleRoute(e, { 
                                                        parent: route.name, 
                                                        name: route.name, 
                                                        path: computePath(route.url), 
                                                        action: getRouteAction(route.action) 
                                                    })
                                                }
                                            />
                                        }

                                    </Fragment>
                                )
                            }

                        </ul>

                        <ul className="nav-list">
                            <NavItem
                                type="sidebar"
                                label={'Logout'}
                                icon={{ enable: true, name: 'layout-left', className: 'pdr1' }}
                                onClick={(e) => handleRoute(e, { parent: 'logout', name: 'logout', path: '/logout', action: getRouteAction('logout') })}
                            />
                        </ul>

                    </div>

                </div>

            </div>
        </>
    )
};

export default SideBar;
