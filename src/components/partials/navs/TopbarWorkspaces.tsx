import React, { Fragment, useEffect } from "react"
import Workspace from "../../../models/Workspace.model";
import useWorkspace from "../../../hooks/app/useWorkspace";
import UserAvatar from "../ui/UserAvatar";
import { WorkspaceEnum } from "../../../utils/enums.util";
import useUser from "../../../hooks/app/useUser";
import Icon from "../icons/Icon";
import Placeholder from "../Placeholder";

interface ITopbarWorkspaces {
}

const TopbarWorkspaces = (props: ITopbarWorkspaces) => {

    const {

    } = props;

    const { workspaces, workspace, setWorkspace, changeWorkspace, getWorkspaces } = useWorkspace()
    const { talent } = useUser()

    useEffect(() => {

    }, [])

    const handleSelect = async (e: any, code: string) => {

        if (e) { e.preventDefault() }

        if (workspace.code !== code) {

            // set main workspace
            const prevCode = workspace.code;
            setWorkspace(code);

            // call API
            changeWorkspace(code).then((resp) => {

                if (!resp.error) {
                    // getWorkspaces({ limit: 9999, page: 1, order: 'asc' });
                } else {
                    setWorkspace(prevCode)
                }

            });



        }


    }

    return (
        <>
            <div className="w-full space-y-[1rem] py-[0.45rem]">

                <h3 className={`pag-600 font-mona-light text-[13px]`}>Your Workspaces</h3>

                {
                    workspaces.loading &&
                    <div className="space-y-[0.45rem]">
                        <Placeholder block={true} width="min-w-[100%]" height="h-[12px] min-h-[12px]" bgColor="bg-pag-100" />
                        <Placeholder width="min-w-[80%]" height="h-[12px] min-h-[12px]" bgColor="bg-pag-100" />
                    </div>
                }

                {
                    !workspaces.loading &&
                    <>
                        <div className="space-y-[0.65rem]">
                            {
                                workspaces.data.map((ws: Workspace) =>
                                    <Fragment key={ws.code}>
                                        <div onClick={(e) => handleSelect(e, ws.code)} className="flex items-center gap-x-[0.45rem] pag-900 pabh-900 cursor-pointer">

                                            <UserAvatar
                                                size="w-[20px] h-[20px]"
                                                className="ws-avatar"
                                                avatar={
                                                    ws.type === WorkspaceEnum.PERSONAL ? talent?.avatar || '../../../images/assets/avatar.png' :
                                                        ws.logo ? ws.logo : ''
                                                }
                                                name={'User Avatar'}
                                            />

                                            {
                                                ws.type === WorkspaceEnum.PERSONAL &&
                                                <span className={`nav-text pag-900 pabh-900 font-mona text-[13px]`}>{ws.name.split(' ')[0]} (Personal)</span>
                                            }

                                            {
                                                ws.type === WorkspaceEnum.BUSINESS &&
                                                <span className={`nav-text pag-900 pabh-900 font-mona text-[13px]`}>{ws.name}</span>
                                            }

                                            {
                                                workspace.code === ws.code &&
                                                <Icon
                                                    type="feather"
                                                    name="check"
                                                    size={13}
                                                    className="ml-auto pas-900"
                                                />
                                            }

                                        </div>
                                    </Fragment>
                                )
                            }
                        </div>
                    </>
                }


            </div>
        </>
    )

};

export default TopbarWorkspaces;
