import { Children, useReducer, useCallback, useContext, useMemo } from 'react'
import GeniusContext from './appContext'
import GeniusReducer from './appReducer'
import AxiosService from '../../services/axios.service'
import { IClearResource, ICollection, ISetLoading, ITaskSubmission, IUnsetLoading } from '../../utils/interfaces.util'
import { useNavigate } from 'react-router-dom'
import storage from '../../utils/storage.util'
import loader from '../../utils/loader.util'
import { LoadingType } from '../../utils/types.util'
import { aiquestion, collection, coreResource, metrics, pagination, UIAssessments, UIPoller } from '../../_data/seed'
import helper from '../../utils/helper.util'
import {
    SET_LOADER,
    SET_LOADING,
    UNSET_LOADING
} from '../types'

const AppState = (props: any) => {

    const initialState = {
        poller: UIPoller,
        assessments: collection,
        assessment: {},
        industries: collection,
        industry: {},
        careers: collection,
        career: {},
        fields: collection,
        field: {},
        skills: collection,
        skill: {},
        questions: collection,
        question: {},
        aiQuestions: aiquestion,
        topics: collection,
        topic: {},
        pendingTasks: collection,
        availableTasks: collection,
        inprogressTasks: collection,
        defaultedTasks: collection,
        completedTasks: collection,
        abandonedTasks: collection,
        tasks: collection,
        submissions: collection,
        taskSubmissionItems: Array<ITaskSubmission>,
        task: {},
        comments: collection,
        comment: {},
        plans: collection,
        plan: {},
        transactions: collection,
        transaction: {},
        feedbacks: collection,
        feedback: {},
        tickets: collection,
        ticket: {},
        roadmaps: collection,
        roadmap: {},
        items: [],
        uiFeatures: [],
        core: coreResource,
        metrics: metrics,
        search: collection,
        leaderboard: collection,
        camsDashboard: {},
        camsEvents: collection,
        camsEvent: {},
        camsEventStats: {},
        camsCenters: collection,
        camsCountries: [],
        camsParticipants: collection,
        camsParticipant: {},
        camsAccommodations: collection,
        camsAccommodation: {},
        camsRooms: collection,
        camsRoom: {},
        camsResourceGroups: collection,
        camsResourceGroupTypes: collection,
        camsResourceTypeGroups: collection,
        camsServicePoints: collection,
        camsSessions: collection,
        camsSession: {},
        camsUsers: collection,
        camsUser: {},
        camsReports: collection,
        camsReport: {},
        camsSelectedEvent: storage.fetch('cams.selectedEvent') || {},
        message: '',
        loading: false,
        loader: false
    }

    const [state, dispatch] = useReducer(GeniusReducer, initialState);

    /**
     * @name setLoading
     * @param data 
     */
    const setLoading = useCallback(async (data: ISetLoading) => {

        if (data.option === 'default') {
            dispatch({
                type: SET_LOADING
            })
        }

        if (data.option === 'loader') {
            dispatch({
                type: SET_LOADER,
                payload: true
            })
        }

        if (data.option === 'resource' && data.type) {

            const { loading, ...rest } = collection;

            dispatch({
                type: data.type,
                payload: {
                    ...rest,
                    loading: true
                }
            })

        }

    }, [])

    /**
     * @name unsetLoading
     * @param data 
     */
    const unsetLoading = useCallback(async (data: IUnsetLoading) => {

        if (data.option === 'default') {
            dispatch({
                type: UNSET_LOADING,
                payload: data.message
            })
        }

        if (data.option === 'loader') {
            dispatch({
                type: SET_LOADER,
                payload: false
            })
        }

        if (data.option === 'resource' && data.type) {

            const { loading, message, ...rest } = collection;

            dispatch({
                type: data.type,
                payload: {
                    ...rest,
                    loading: false,
                    message: data.message
                }
            })

        }

    }, [])

    /**
     * @name clearResource
     * @param data 
     */
    const clearResource = useCallback((data: IClearResource) => {

        let payload: any = {}

        if (data.resource === 'multiple') {
            payload = collection
        }

        dispatch({
            type: data.type,
            payload: payload
        })

    }, [])


    const setCollection = useCallback((type: string, data: ICollection) => {
        dispatch({
            type: type,
            payload: data
        })
    }, [])

    const setResource = useCallback((type: string, data: any) => {
        dispatch({
            type: type,
            payload: data
        })
    }, [])

    const contextValues = useMemo(() => ({
        poller: state.poller,
        assessments: state.assessments,
        assessment: state.assessment,
        industries: state.industries,
        industry: state.industry,
        careers: state.careers,
        career: state.career,
        fields: state.fields,
        field: state.field,
        skills: state.skills,
        skill: state.skill,
        questions: state.questions,
        question: state.question,
        aiQuestions: state.aiQuestions,
        topics: state.topics,
        topic: state.topic,
        tasks: state.tasks,
        submissions: state.submissions,
        pendingTasks: state.pendingTasks,
        availableTasks: state.availableTasks,
        inprogressTasks: state.inprogressTasks,
        defaultedTasks: state.defaultedTasks,
        completedTasks: state.completedTasks,
        abandonedTasks: state.abandonedTasks,
        task: state.task,
        taskSubmissionItems: state.taskSubmissionItems,
        comments: state.comments,
        comment: state.comment,
        plans: state.plans,
        plan: state.plan,
        transactions: state.transactions,
        transaction: state.transaction,
        feedbacks: state.feedbacks,
        feedback: state.feedback,
        tickets: state.tickets,
        ticket: state.ticket,
        roadmaps: state.roadmaps,
        roadmap: state.roadmap,
        items: state.items,
        uiFeatures: state.uiFeatures,
        core: state.core,
        metrics: state.metrics,
        search: state.search,
        message: state.message,
        leaderboard: state.leaderboard,
        camsDashboard: state.camsDashboard,
        camsEvents: state.camsEvents,
        camsEvent: state.camsEvent,
        camsEventStats: state.camsEventStats,
        camsCenters: state.camsCenters,
        camsCountries: state.camsCountries,
        camsParticipants: state.camsParticipants,
        camsParticipant: state.camsParticipant,
        camsAccommodations: state.camsAccommodations,
        camsAccommodation: state.camsAccommodation,
        camsRooms: state.camsRooms,
        camsRoom: state.camsRoom,
        camsResourceGroups: state.camsResourceGroups,
        camsResourceGroupTypes: state.camsResourceGroupTypes,
        camsResourceTypeGroups: state.camsResourceTypeGroups,
        camsServicePoints: state.camsServicePoints,
        camsSessions: state.camsSessions,
        camsSession: state.camsSession,
        camsUsers: state.camsUsers,
        camsUser: state.camsUser,
        camsReports: state.camsReports,
        camsReport: state.camsReport,
        camsSelectedEvent: state.camsSelectedEvent,
        loading: state.loading,
        loader: state.loader,
        setLoading: setLoading,
        unsetLoading: unsetLoading,
        clearResource: clearResource,
        setResource: setResource,
        setCollection: setCollection,
    }), [
        state.poller,
        state.assessments,
        state.assessment,
        state.industries,
        state.industry,
        state.careers,
        state.career,
        state.fields,
        state.field,
        state.skills,
        state.skill,
        state.questions,
        state.question,
        state.aiQuestions,
        state.topics,
        state.topic,
        state.pendingTasks,
        state.availableTasks,
        state.inprogressTasks,
        state.defaultedTasks,
        state.completedTasks,
        state.abandonedTasks,
        state.tasks,
        state.submissions,
        state.task,
        state.taskSubmissionItems,
        state.comments,
        state.comment,
        state.plans,
        state.plan,
        state.transactions,
        state.transaction,
        state.feedbacks,
        state.feedback,
        state.tickets,
        state.ticket,
        state.roadmaps,
        state.roadmap,
        state.items,
        state.uiFeatures,
        state.metrics,
        state.search,
        state.message,
        state.loading,
        state.loader,
        state.leaderboard,
        state.core,
        state.camsDashboard,
        state.camsEvents,
        state.camsEvent,
        state.camsEventStats,
        state.camsCenters,
        state.camsCountries,
        state.camsParticipants,
        state.camsParticipant,
        state.camsAccommodations,
        state.camsAccommodation,
        state.camsRooms,
        state.camsRoom,
        state.camsResourceGroups,
        state.camsResourceGroupTypes,
        state.camsResourceTypeGroups,
        state.camsServicePoints,
        state.camsSessions,
        state.camsSession,
        state.camsUsers,
        state.camsUser,
        state.camsReports,
        state.camsReport,
        state.camsSelectedEvent,
        setLoading,
        unsetLoading,
        clearResource,
        setCollection,
        setResource
    ])

    return <GeniusContext.Provider
        value={contextValues}
    >
        {props.children}
    </GeniusContext.Provider>

}

export default AppState;
