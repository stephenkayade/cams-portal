import { IUserCountry } from "../utils/interfaces.util"
import Group from "./Group.model"
import Talent from "./Talent.model"

interface Business {

    code: string,
    logo: string,
    name: string,
    email: string,
    businessType: string,
    profile: {
        description: string,
        legalName: string,
        industry: string,
        phoneNumber: string,
        phoneCode: string,
        countryPhone: string,
        email: string,
        websiteUrl: string,
    },
    country: IUserCountry,
    onboarding: {
        step: number,
        status: string,
    }
    location: {
        city: string,
        state: string,
        address: string,
    }
    slug: string,

    settings: string | any
    subscription: string | any
    user: string | any
    talents: Array<string | any>
    recipients: Array<string | any>
    assessments: Array<string | any>
    groups: Array<string | any>
    roadmaps: Array<string | any>
    transactions: Array<string | any>
    projects: Array<string | any>
    tickets: Array<string | any>

    // time stamps
    createdAt: string;
    updatedAt: string;

    // unique ids
    _version: number;
    _id: string;
    id: string;
}

export interface ITopPerformer {
    _id: Talent | any,
    firstName: string,
    lastName: string,
    avatar: string,
    username: string,
    group?: {
        id: string,
        name: string,
    },
    growth: {
        percent: number,
        velocity: number,
    },
}

export interface IBarChart {
    labels: string[],
    datasets: Array<{
        label: string,
        data: Array<number>,
        color: {
            background: string
        }
    }>,
}

export interface IBDSummary {
    talents: number,
    roadmaps: number,
    assessments: number,
    tasks: number,
}

export interface IBDFilter {
    startDate: string,  // ISO string
    endDate: string,    // ISO string
    groupId?: string,   // optional parent/child group
}

export interface IBDGroupStat {
    _id: Group | any,
    name: string,
    talents: number,
    growth: {
        averagePercent: number
    }
}

export interface IBusinessDashboard {
    summary: IBDSummary,
    filters: IBDFilter,
    engagement: {
        rate: number,
        assessments: { 
            started: number, 
            completed: number,
            rate: number,
        },
        roadmaps: { 
            started: number, 
            completed: number,
            rate: number,
        },
        tasks: { 
            started: number, 
            completed: number,
            rate: number,
        },
    },
    trend: {
        period: { 
            startDate: string, 
            endDate: string 
        },
        delta: {
            avgGrowthPercent: number,
            assessments: number,
            roadmaps: number,
            tasks: number,
        },
    },
    performers: {
        list: Array<ITopPerformer>,
        risk:  Array<ITopPerformer>,  // top 3 (or more if you choose)
        best: ITopPerformer | null,
    },
    chart: IBarChart,              // fits react-chartjs-2 bar chart
    groups?: Array<IBDGroupStat>,      // optional per-group breakdown
}

export default Business