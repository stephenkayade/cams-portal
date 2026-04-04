import Assessment from "../models/Assessment.model";
import { IMilestonePath } from "../models/Roadmap.model";
import { ITalentGrowth } from "../models/Talent.model";
import { IBusinessWorkspace, IPersonalWorkspace } from "../models/Workspace.model";
import sidebarRoutes from "../routes/sidebar.route";
import { StatusEnum } from "../utils/enums.util";
import { IAIQuestion, ICollection, IAppMetrics, IPagination, ISidebarProps, IToast, ICoreResource, IPoller, IAPIResponse } from "../utils/interfaces.util";

const avatars = [
    { name: 'sandra', avatar: 'https://storage.googleapis.com/pacitude-buckets/sandra.png' },
    { name: 'femi', avatar: 'https://storage.googleapis.com/pacitude-buckets/femi.png' },
    { name: 'vivek', avatar: 'https://storage.googleapis.com/pacitude-buckets/vivek.png' },
    { name: 'zuri', avatar: 'https://storage.googleapis.com/pacitude-buckets/zuri.png' },
    { name: 'minho', avatar: 'https://storage.googleapis.com/pacitude-buckets/Minho.png' },
    { name: 'sophie', avatar: 'https://storage.googleapis.com/pacitude-buckets/sophie.png' },
    { name: 'trab', avatar: 'https://storage.googleapis.com/pacitude-buckets/trab.png' },
]

const bagdes = [
    { name: 'badge01', avatar: 'https://storage.googleapis.com/pacitude-buckets/badge01.png' },
    { name: 'badge02', avatar: 'https://storage.googleapis.com/pacitude-buckets/badge02.png' },
    { name: 'badge03', avatar: 'https://storage.googleapis.com/pacitude-buckets/badge03.png' },
]

const pilltars = [
    'https://storage.googleapis.com/pacitude-buckets/bg%40core_01.png',
    'https://storage.googleapis.com/pacitude-buckets/bg%40core_02.png',
    'https://storage.googleapis.com/pacitude-buckets/bg%40core_03.png',
    'https://storage.googleapis.com/pacitude-buckets/bg%40core_04.png',
    'https://storage.googleapis.com/pacitude-buckets/bg%40core_05.png',
    'https://storage.googleapis.com/pacitude-buckets/bg%40core_06.png'
]

const levels = [
    { name: 'Novice', value: 'novice', description: 'Possesses foundational knowledge; requires significant guidance and supervision. Focus is on learning basic concepts and terminology.' },
    { name: 'Beginner', value: 'beginner', description: 'Has a basic understanding and can perform simple tasks with guidance. Starting to apply knowledge in practical situations, but still developing core skills.' },
    { name: 'Intermediate', value: 'intermediate', description: 'Demonstrates competence in performing tasks independently. Possesses a solid understanding and can handle moderately complex challenges. Ready for more responsibility.' },
    { name: 'Advanced', value: 'advanced', description: 'Displays a high level of expertise and can handle complex situations with autonomy. Contributes to process improvement and may mentor others.' },
    { name: 'Professional', value: 'professional', description: 'Exhibits mastery and deep understanding. Serves as a trusted expert, driving innovation, and shaping industry standards. Provides leadership and strategic direction.' }
];

const talents = [
    {
        id: '34567890',
        avatar: 'JD',
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe'
    },
    {
        id: '876544567',
        avatar: avatars[3].avatar,
        firstName: 'Elizabeth',
        lastName: 'Awelayo',
        name: 'Elizabeth Awelayo'
    },
    {
        id: '54567890',
        avatar: avatars[2].avatar,
        firstName: 'Benjamin',
        lastName: 'Reyes',
        name: 'Benjamin Reyes'
    },
    {
        id: '8765456789',
        avatar: avatars[5].avatar,
        firstName: 'Sophie',
        lastName: 'Brent',
        name: 'Sophie Brent'
    },
    {
        id: '745678978',
        avatar: avatars[4].avatar,
        firstName: 'Minho',
        lastName: 'Kwon',
        name: 'Minho Kwon'
    }
]

const pagination: IPagination = {
    next: { page: 1, limit: 25 },
    prev: { page: 1, limit: 25 },
}

const collection: ICollection = {
    data: [],
    count: 0,
    total: 0,
    pagination: pagination,
    loading: false,
    message: 'There are no data currently'
}

const UIPoller: IPoller = {
    loading: false,
    code: '',
    key: '',
    status: 'pending'
}

const sidebar: ISidebarProps = {
    collapsed: false,
    route: sidebarRoutes[0],
    isOpen: false,
    subroutes: [],
    inroutes: []
}

const toast: IToast = {
    type: 'success',
    show: false,
    message: '',
    title: 'Feedback',
    position: 'top-right',
    close: () => { }
}

// special to project
const aiquestion: Array<IAIQuestion> = [];

const metrics: IAppMetrics = {
    loading: false,
    message: '',
    type: 'default',
    resource: 'default',
    data: {
        roadmap: {
            total: 0, enabled: 0, disabled: 0, pending: 0, completed: 0,
            resource: {
                total: 0, enabled: 0, disabled: 0,
            }
        }
    }
}

const limits: Array<{ label: string, value: number }> = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '200', value: 200 }
]

const difficulties = [
    { name: 'Random', value: 'random' },
    { name: 'Easy', value: 'easy' },
    { name: 'Normal', value: 'normal' },
    { name: 'Hard', value: 'hard' },
    { name: 'Difficult', value: 'difficult' }
]

const questionTypes = [
    { name: 'General', value: 'general' },
    { name: 'Practical', value: 'practical' },
    { name: 'Trivial', value: 'trivial' }
]

const timeHandles = [
    { name: 'Seconds', value: 'second' },
    { name: 'Minutes', value: 'minute' },
    { name: 'Hours', value: 'hour' }
]

const allocatedTimes = [
    { name: 'One', value: '1' },
    { name: 'Two', value: '2' },
    { name: 'Three', value: '3' },
    { name: 'Four', value: '4' },
    { name: 'Five', value: '5' }
]

const coreResource: ICoreResource = {
    industries: [],
    careers: [],
    fields: [],
    skills: [],
    topics: []
}

const onboard = {
    stepBg: '#ECD4E8',
    stepActive: '#45C2F0',
    purple: { color: '#420988', bg: '#F4EBFF', active: '#6A08E2' },
    blue: { color: '#055286', bg: '#EBF7FF', active: '#0B80CF' },
    green: { color: '#055609', bg: '#EBFFEC', active: '#1FAE27' },
    yellow: { color: '#8B5C07', bg: '#FFF8EB', active: '#E0970F' },
    red: { color: '#B80606', bg: '#FFEBEB', active: '#FF3030' },
    pink: { color: '#C620AB', bg: '#FFECFC', active: '#EA04C4' }
}

const UIAssessments: Array<Partial<Assessment>> = [

]

const UIPlanFeatures = [
    { id: 'assessment', name: 'assessment', title: 'Assessments per month' },
    { id: 'task', name: 'task', title: 'Tasks per month' },
    { id: 'project', name: 'project', title: 'Paid projects' },
    { id: 'career', name: 'career', title: 'Careers per account' },
    { id: 'earn', name: 'earn', title: 'Earn with points and projects' },
    { id: 'session', name: 'session', title: 'Exclusive 1/1 career sessions' },
    { id: 'resume', name: 'resume', title: 'AI Resume and portfolio Builds' },
    { id: 'support', name: 'support', title: 'Personalized 24/7 support' },
    { id: 'report', name: 'report', title: 'Monthly growth report' },
    { id: 'integration', name: 'integration', title: 'Custom integrations' },
]

const UITicketTopics = [
    { label: 'Assessments', value: 'assessments' },
    { label: 'Projects', value: 'projects' },
    { label: 'Tasks', value: 'tasks' },
    { label: 'Career Sessions', value: 'career sessions' },
    { label: 'Earnings', value: 'earnings' },
    { label: 'Subscription', value: 'subscription' },
    { label: 'Leaderboard', value: 'leaderboard' },
    { label: 'Roadmaps', value: 'roadmaps' },
]

const UIGrowth: ITalentGrowth = {
    main: {
        percent: 0,
        level: '',
        week: 0,
        velocity: 0,
        data: [
            { name: 'Jan', plot: 4000, value: 1500 },
            { name: 'Feb', plot: 3000, value: 2200 },
            { name: 'Mar', plot: 2000, value: 1900 },
            { name: 'Apr', plot: 2780, value: 5000 },
            { name: 'May', plot: 1890, value: 4800 },
            { name: 'Jun', plot: 2390, value: 7500 },
            { name: 'Jul', plot: 3490, value: 9000 },
        ]
    },
    timeline: [],
    badges: [],
    points: 0,
    wallet: 0.00,
    rubrics: [],
    completions: [],
    peers: [],
    comparison: {
        peerAveragePoints: 0,
        percentile: 0,
        totalPeers: 0,
    },
    roadmap: {
        completed: 0,
        pending: 0,
    },
    skills: [],
    streak: {
        current: 0,
        longest: 0,
        updatedAt: ''
    }
}

const normWorkspace: { personal: IPersonalWorkspace | null, businesses: Array<IBusinessWorkspace> } = {
    personal: null,
    businesses: []
}

const taskSubmissionTypes = [
    { name: 'Link', value: 'link' },
    { name: 'File Upload', value: 'file' },
]

const apiresponse: IAPIResponse = {
    error: false,
    errors: [],
    report: {
        format: '',
        csv: '',
        pdf: '',
        xml: ''
    },
    count: 0,
    total: 0,
    pagination: pagination,
    data: null,
    message: '',
    token: '',
    status: 200
}

export {
    sidebar,
    avatars,
    pilltars,
    toast,
    collection,
    UIPoller,
    pagination,
    talents,
    limits,
    levels,
    difficulties,
    questionTypes,
    timeHandles,
    allocatedTimes,
    coreResource,
    onboard,
    bagdes,
    UIAssessments,
    UIPlanFeatures,
    UITicketTopics,
    UIGrowth,
    aiquestion,
    metrics,
    normWorkspace,
    taskSubmissionTypes,
    apiresponse
};