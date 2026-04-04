import {
    SET_LOADING,
    UNSET_LOADING,
    GET_INDUSTRIES,
    GET_INDUSTRY,
    GET_CAREERS,
    GET_CAREER,
    GET_FIELDS,
    GET_FIELD,
    GET_SKILLS,
    GET_SKILL,
    GET_QUESTIONS,
    GET_QUESTION,
    GET_TOPICS,
    GET_TOPIC,
    SET_AIQUESTION,
    SET_SEARCH,
    GET_METRICS,
    SET_ITEMS,
    GET_CORE,
    GET_LEADERBOARD,
    GET_ASSESSMENTS,
    GET_ASSESSMENT,
    GET_PLANS,
    GET_PLAN,
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    GET_FEEDBACKS,
    GET_FEEDBACK,
    GET_TICKETS,
    GET_TICKET,
    GET_ROADMAPS,
    GET_ROADMAP,
    SET_LOADER,
    SET_POLLER,
    SET_UI_FEATURES,
    GET_TASKS,
    GET_TASK,
    GET_COMMENTS,
    GET_COMMENT,
    GET_AVAILABLE_TASKS,
    GET_INPROGRESS_TASKS,
    GET_COMPLETED_TASKS,
    GET_ABANDONED_TASKS,
    GET_DEFAULTED_TASKS,
    GET_PENDING_TASKS,
    GET_TASK_SUBMISSIONS,
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
        case GET_CORE:
            return {
                ...state,
                core: action.payload
            }
        case GET_ASSESSMENTS:
            return {
                ...state,
                assessments: action.payload
            }
        case GET_ASSESSMENT:
            return {
                ...state,
                assessment: action.payload
            }
        case GET_PLANS:
            return {
                ...state,
                plans: action.payload
            }
        case GET_PLAN:
            return {
                ...state,
                plan: action.payload
            }
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            }
        case GET_TRANSACTION:
            return {
                ...state,
                transaction: action.payload
            }
        case GET_FEEDBACKS:
            return {
                ...state,
                feedbacks: action.payload
            }
        case GET_FEEDBACK:
            return {
                ...state,
                feedback: action.payload
            }
        case GET_TICKETS:
            return {
                ...state,
                tickets: action.payload
            }
        case GET_TICKET:
            return {
                ...state,
                ticket: action.payload
            }
        case GET_ROADMAPS:
            return {
                ...state,
                roadmaps: action.payload
            }
        case GET_ROADMAP:
            return {
                ...state,
                roadmap: action.payload
            }
        case GET_LEADERBOARD:
            return {
                ...state,
                leaderboard: action.payload
            }
        case GET_INDUSTRIES:
            return {
                ...state,
                industries: action.payload
            }
        case GET_INDUSTRY:
            return {
                ...state,
                industry: action.payload
            }
        case GET_CAREERS:
            return {
                ...state,
                careers: action.payload
            }
        case GET_CAREER:
            return {
                ...state,
                career: action.payload
            }
        case GET_FIELDS:
            return {
                ...state,
                fields: action.payload
            }
        case GET_FIELD:
            return {
                ...state,
                field: action.payload
            }
        case GET_SKILLS:
            return {
                ...state,
                skills: action.payload
            }
        case GET_SKILL:
            return {
                ...state,
                skill: action.payload
            }
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        case GET_QUESTION:
            return {
                ...state,
                question: action.payload
            }
        case GET_TOPICS:
            return {
                ...state,
                topics: action.payload
            }
        case GET_TOPIC:
            return {
                ...state,
                topic: action.payload
            }
        case GET_AVAILABLE_TASKS:
            return {
                ...state,
                availableTasks: action.payload
            }
        case GET_PENDING_TASKS:
            return {
                ...state,
                pendingTasks: action.payload
            }
        case GET_INPROGRESS_TASKS:
            return {
                ...state,
                inprogressTasks: action.payload
            }
        case GET_COMPLETED_TASKS:
            return {
                ...state,
                completedTasks: action.payload
            }
        case GET_ABANDONED_TASKS:
            return {
                ...state,
                abandonedTasks: action.payload
            }
        case GET_DEFAULTED_TASKS:
            return {
                ...state,
                defaultedTasks: action.payload
            }
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
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            }
        case GET_TASK_SUBMISSIONS:
            return {
                ...state,
                submissions: action.payload
            }
        case GET_TASK:
            return {
                ...state,
                task: action.payload
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case GET_COMMENT:
            return {
                ...state,
                comment: action.payload
            }
        case GET_METRICS:
            return {
                ...state,
                metrics: action.payload
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
        case SET_AIQUESTION:
            return {
                ...state,
                aiQuestions: action.payload
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
