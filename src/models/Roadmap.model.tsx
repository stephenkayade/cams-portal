import { NA } from "../utils/types.util"
import Assessment from "./Assessment.model"
import Field from "./Field.model"
import Skill from "./Skill.model"
import Talent from "./Talent.model"
import Task from "./Task.model"
import Topic from "./Topic.model"

interface Roadmap {
    code: string,
    title: string,
    description: string,
    type: string,
    owner: string,
    slug: string,
    isEnabled: boolean,
    milestones: Array<IMilestonePath>
    status: string,
    isTemplate: boolean,
    startDate: {
        date: string,
        ISO: string
    },
    endDate: {
        date: string,
        ISO: string
    },
    learning: IRoadmapLearning,
    aipath: string | null,
    resources: Array<IResourceLink>
    level: string

    business: string | NA,
    talent: Talent | any,
    field: Field | any,
    topic: Topic | any,
    assessments: Array<Assessment | any>
    tasks: Array<Task | any>
    learners: Array<Talent | Talent>
    skills: Array<Skill | any>

    // time stamps
    createdAt: string;
    updatedAt: string;

    // unique ids
    _version: number;
    _id: string;
    id: string;

}

export interface IResourceLink {
    name: string,
    title: string,
    url: string,
    snippet: string,
}

export interface IMilestonePath {
    code: string,
    name: string,
    description: string,
    startDate: {
        date: string,
        ISO: string
    },
    endDate: {
        date: string,
        ISO: string
    },
    outcomes: Array<string>
    status: string,
    resources: Array<IMilestoneResource>
}

export interface IRoadmapLearning {
    progress: number,
    assessments: number,
    question: {
        correct: number,
        unanswered: number
    },
    outcomes: Array<string>
}

export interface IMilestoneResource {
    name: string,
    link: {
        title: string,
        snippet: string,
        url: string
    }
}

export interface IGroupedResource {
    name: string;
    links: Array<{
        title: string;
        snippet: string,
        url: string;
    }>;
}



export default Roadmap;