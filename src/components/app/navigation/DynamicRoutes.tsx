import React, { Fragment, lazy } from 'react'
import { Routes, Route } from 'react-router-dom';
import routes from '../../../routes/routes'
import DashboardLayout from '../../layout/DashboardLayout'

import routil from '../../../utils/routes.util';

import Renderer from '../../../pages/Renderer'
import Login from '../../../pages/auth/Login'
import Register from '../../../pages/auth/Register'
import ResetPassword from '../../../pages/auth/ResetPassword'
import VerifyPage from '../../../pages/auth/Verify'
import InvitePage from '../../../pages/auth/invite/Invite'
import BusinessInvitePage from '../../../pages/auth/invite/InviteBusiness'
import NotFoundPage from '../../../pages/NotFound'

const Dashboard = lazy(() => import('../../../pages/dashboard/cams/dashboard/Dashboard'))
const Events = lazy(() => import('../../../pages/dashboard/cams/events/Events'))
const AddEvent = lazy(() => import('../../../pages/dashboard/cams/events/AddEvent'))
const EventDetails = lazy(() => import('../../../pages/dashboard/cams/events/EventDetails'))
const EventEdit = lazy(() => import('../../../pages/dashboard/cams/events/EventEdit'))
const Participants = lazy(() => import('../../../pages/dashboard/cams/participants/Participants'))
const ParticipantDetails = lazy(() => import('../../../pages/dashboard/cams/participants/ParticipantDetails'))
const Accommodations = lazy(() => import('../../../pages/dashboard/cams/accommodations/Accommodations'))
const Resources = lazy(() => import('../../../pages/dashboard/cams/resources/Resources'))
const Sessions = lazy(() => import('../../../pages/dashboard/cams/sessions/Sessions'))
const Users = lazy(() => import('../../../pages/dashboard/cams/users/Users'))
const Reports = lazy(() => import('../../../pages/dashboard/cams/reports/Reports'))
const Communications = lazy(() => import('../../../pages/dashboard/cams/communications/Communications'))
const NetworkPage = lazy(() => import('../../../pages/NetworkPage'))

const DynamicRoutes = () => {

    const getAppPages = (name: string) => {
        switch (name) {
            case 'render':
                return <Renderer />
            case '/':
                return <Login />
            case 'login':
                return <Login />
            case 'register':
                return <Register />
            case 'verify':
                return <VerifyPage />
            case 'reset-password':
                return <ResetPassword />
            case 'invite-accept':
                return <InvitePage />
            case 'invite-business':
                return <BusinessInvitePage />
            case 'dashboard':
                return <Dashboard />
            case 'events':
                return <Events />
            case 'event-add':
                return <AddEvent />
            case 'event-details':
                return <EventDetails />
            case 'event-edit':
                return <EventEdit />
            case 'participants':
                return <Participants />
            case 'participant-details':
                return <ParticipantDetails />
            case 'accommodations':
                return <Accommodations />
            case 'resources':
                return <Resources />
            case 'sessions':
                return <Sessions />
            case 'users':
                return <Users />
            case 'reports':
                return <Reports />
            case 'communications':
                return <Communications />
            case 'no-network':
                return <NetworkPage />
            default:
                return <NotFoundPage />
        }
    }

    return (
        <Routes>
            {routes.map((route, index) => (
                <Fragment key={`route-${index + 1}`}>
                    {!route.isAuth && (
                        <Route
                            path={routil.computeAppRoute(route)}
                            element={getAppPages(route.name)}
                        />
                    )}

                    {route.isAuth && route.name !== 'divider' && (
                        <>
                            <Route
                                path={routil.computePath(route.url)}
                                element={
                                    <DashboardLayout
                                        component={getAppPages(route.name)}
                                        title={route.title ? route.title : route.name}
                                        back={route.content.backButton ? route.content.backButton : false}
                                        sidebar={{
                                            collapsed: route.content.collapsed ? route.content.collapsed : false
                                        }}
                                    />
                                }
                            />

                            {route.inroutes && route.inroutes.map((inroute, irIndex) => (
                                <Route
                                    key={`inroute-${index + 1}-${irIndex + 1}`}
                                    path={routil.computeInPath(inroute)}
                                    element={
                                        <DashboardLayout
                                            component={getAppPages(inroute.name)}
                                            title={inroute.title ? inroute.title : inroute.name}
                                            back={inroute.content.backButton ? inroute.content.backButton : false}
                                            sidebar={{
                                                collapsed: inroute.content.collapsed ? inroute.content.collapsed : false
                                            }}
                                        />
                                    }
                                />
                            ))}
                        </>
                    )}
                </Fragment>
            ))}

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default DynamicRoutes
