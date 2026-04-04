import { IUserCountry, } from "../utils/interfaces.util";
import Assessment from "./Assessment.model";
import Career from "./Career.model";
import Field from "./Field.model";
import Roadmap from "./Roadmap.model";
import Skill from "./Skill.model";
import Subscription from "./Subscription.model";
import Task from "./Task.model";
import User from "./User.model";
import Workspace from "./Workspace.model";

interface Talent {

    code: string,
    username: string,
    firstName: string,
    lastName: string,
    avatar: string,
    middleName: string,
    email: string,
    slug: string,
    onboarding: {
        step: number,
        status: string,
    }
    phoneNumber: string,
    phoneCode: string,
    countryPhone: string
    country: IUserCountry,
    homeCountry: IUserCountry,
    gender: string,
    growth: {
        velocity: number,
        level: string;
        week: number;
        percent: number;
        data: Array<{
            name: string,
            value: number,
            plot: number
        }>;
    }

    streak: ITalentStreak
    stats: ITalentStats,

    invites: Array<string | any>
    inviteToken: string | undefined | null;
    inviteTokenExpire: string | undefined | null;

    // relationships
    user: User | any
    settings: string | any,
    subscription: Subscription | any,
    assessments: Array<Assessment | any>
    skills: Array<Skill | any>
    fields: Array<Field | any>
    pursuits: Array<Career | any>
    tickets: Array<string | any>
    groups: Array<ITalentGroup>
    roadmaps: Array<ITalentRoadmap>
    businesses: Array<string | any>
    workspaces: Array<Workspace | any>

    careers: Array<ITalentCareer>
    tasks: Array<ITaskStatus>
    badges: Array<ITalentBadge>

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: any;
    id: any;

}

export interface ITalentGroup {
    talent: Talent | any,
    business: any,
    group: any
}

export interface ITalentRoadmap {
    talent: Talent | any,
    business: any,
    roadmap: Roadmap | any
}

export interface ITalentStreak {
    current: number,
    longest: number,
    weekly: number,
    updatedAt: string
}

export interface ITalentStats {
    correctness: {
        trivia: number,
        practical: number,
    },
    ontime: {
        assessment: number
    }
}

export interface ITalentCareer {
    career: Career | any,
    fields: Array<Field | any>,
    level: string,
    currentLevel: string,
    skills: Array<Field | any>,
    assessments: number
    tasks: number
    projects: number
    sessions: number,
    roadmaps: number
    points: number,
    timeline: Array<ICareerTimeline>
    badges: Array<ITalentBadge>
}

export interface ICareerTimeline {
    position: number
    level: string,
    duration: number,
    handle: string,
    isActive: boolean
}

export interface ITaskStatus {
    id: Task | any,
    status: string
}

export interface ITalentBadge {
    category: string,
    name: string,
    logo: string,
    description: string,
    career: string,
    field: string
}

export interface ITalentPeer {
    avatar: string,
    assessments: number,
    tasks: number,
    projects: number,
    sessions: number,
    fields: Array<Field | any>,
    level: string,
    firstName: string,
    lastName: string,
    skills: Array<Skill | any>
    points: number,
    username: string,
}

export interface IGrowthData {
    percent: number,
    level: string,
    week: number
    data: Array<{
        name: string,
        value: number,
        plot: number
    }>
}

export interface IChartData {
    name: string,
    value: number,
    plot: number
}

export interface ITalentGrowth {
    main: {
        percent: number,
        velocity: number,
        level: string,
        week: number
        data: Array<IChartData>
    },
    timeline: Array<ICareerTimeline>,
    badges: Array<ITalentBadge>,
    points: number,
    wallet: number,
    streak: { current: number, longest: number, updatedAt: string }
    skills: Array<{
        id: string;
        name: string;
        percent: number;
    }>
    rubrics: Array<{
        name: string,
        total: number,
        percent: number
    }>,
    completions: Array<{
        name: string,
        percent: number
    }>,
    roadmap: {
        completed: number,
        pending: number
    },
    peers: Array<ITalentPeer>
    comparison: {
        percentile: number;
        peerAveragePoints: number;
        totalPeers: number;
    }
}

export default Talent;