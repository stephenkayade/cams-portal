import {
    SET_LOADING,
    UNSET_LOADING,
    SET_SEARCH,
    SET_ITEMS,
    SET_LOADER,
    SET_POLLER,
    SET_UI_FEATURES,
    GET_CAMS_DASHBOARD,
    GET_CAMS_EVENTS,
    GET_CAMS_EVENT,
    GET_CAMS_EVENT_STATS,
    GET_CAMS_CENTERS,
    GET_CAMS_COUNTRIES,
    GET_CAMS_PARTICIPANTS,
    GET_CAMS_PARTICIPANT,
    GET_CAMS_ACCOMMODATIONS,
    GET_CAMS_ACCOMMODATION,
    GET_CAMS_ROOMS,
    GET_CAMS_ROOM,
    GET_CAMS_RESOURCE_GROUPS,
    GET_CAMS_RESOURCE_GROUP_TYPES,
    GET_CAMS_RESOURCE_TYPE_GROUPS,
    GET_CAMS_SERVICE_POINTS,
    GET_CAMS_SESSIONS,
    GET_CAMS_SESSION,
    GET_CAMS_USERS,
    GET_CAMS_USER,
    GET_CAMS_REPORTS,
    GET_CAMS_REPORT,
    SET_CAMS_SELECTED_EVENT
} from "../types";

const AppReducer = (state: any, action: any) => {

    switch (action.type) {
        
        case GET_CAMS_DASHBOARD:
            return {
                ...state,
                camsDashboard: action.payload
            }
        case GET_CAMS_EVENTS:
            return {
                ...state,
                camsEvents: action.payload
            }
        case GET_CAMS_EVENT:
            return {
                ...state,
                camsEvent: action.payload
            }
        case GET_CAMS_EVENT_STATS:
            return {
                ...state,
                camsEventStats: action.payload
            }
        case GET_CAMS_CENTERS:
            return {
                ...state,
                camsCenters: action.payload
            }
        case GET_CAMS_COUNTRIES:
            return {
                ...state,
                camsCountries: action.payload
            }
        case GET_CAMS_PARTICIPANTS:
            return {
                ...state,
                camsParticipants: action.payload
            }
        case GET_CAMS_PARTICIPANT:
            return {
                ...state,
                camsParticipant: action.payload
            }
        case GET_CAMS_ACCOMMODATIONS:
            return {
                ...state,
                camsAccommodations: action.payload
            }
        case GET_CAMS_ACCOMMODATION:
            return {
                ...state,
                camsAccommodation: action.payload
            }
        case GET_CAMS_ROOMS:
            return {
                ...state,
                camsRooms: action.payload
            }
        case GET_CAMS_ROOM:
            return {
                ...state,
                camsRoom: action.payload
            }
        case GET_CAMS_RESOURCE_GROUPS:
            return {
                ...state,
                camsResourceGroups: action.payload
            }
        case GET_CAMS_RESOURCE_GROUP_TYPES:
            return {
                ...state,
                camsResourceGroupTypes: action.payload
            }
        case GET_CAMS_RESOURCE_TYPE_GROUPS:
            return {
                ...state,
                camsResourceTypeGroups: action.payload
            }
        case GET_CAMS_SERVICE_POINTS:
            return {
                ...state,
                camsServicePoints: action.payload
            }
        case GET_CAMS_SESSIONS:
            return {
                ...state,
                camsSessions: action.payload
            }
        case GET_CAMS_SESSION:
            return {
                ...state,
                camsSession: action.payload
            }
        case GET_CAMS_USERS:
            return {
                ...state,
                camsUsers: action.payload
            }
        case GET_CAMS_USER:
            return {
                ...state,
                camsUser: action.payload
            }
        case GET_CAMS_REPORTS:
            return {
                ...state,
                camsReports: action.payload
            }
        case GET_CAMS_REPORT:
            return {
                ...state,
                camsReport: action.payload
            }
        case SET_CAMS_SELECTED_EVENT:
            return {
                ...state,
                camsSelectedEvent: action.payload
            }

        case SET_POLLER:
            return {
                ...state,
                poller: action.payload
            }
        case SET_ITEMS:
            return {
                ...state,
                items: action.payload
            }
        case SET_UI_FEATURES:
            return {
                ...state,
                uiFeatures: action.payload
            }
       
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case UNSET_LOADING:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case SET_LOADER:
            return {
                ...state,
                loader: action.payload
            }
        default:
            return {
                ...state
            }

    }
}

export default AppReducer;
