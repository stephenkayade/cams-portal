import React, { ReactNode } from "react"
import useWorkspace from "../../../hooks/app/useWorkspace";
import { Navigate } from 'react-router-dom'
import CardLoading from "../loaders/CardLoading";

type RouteToGuard = 'billing' | 'referrals' | 'subscribe';

const WorkspaceGuard = (props: { route: RouteToGuard, children: ReactNode }) => {

    const {
        route,
        children
    } = props;

    const { workspace, workspaceLoading, revealByWorkspace } = useWorkspace()

    if (workspaceLoading || !workspace) {
        return (
            <>
                {
                    route === 'billing' &&
                    <CardLoading type="billling" size={1} />
                }
                {
                    route === 'referrals' &&
                    <CardLoading type="billling" size={1} />
                }
                {
                    route === 'subscribe' &&
                    <CardLoading type="plan" size={1} />
                }
            </>
        )
    }

    const blocked = revealByWorkspace({
        route,
        feature: workspace.feature,
        loading: false, // important: don't re-hide when just switching
    });

    if (blocked) {
        // Option 1: redirect to dashboard
        return <Navigate to="/dashboard" replace />;

        // Option 2: render a "feature not available" empty state instead:
        // return <FeatureUnavailable route={route} />;
    }

    // Route is allowed: render page without extra loaders
    return <>{children}</>;

};

export default WorkspaceGuard;
