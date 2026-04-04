import { IGrade } from "../utils/interfaces.util";
import Career from "./Career.model";
import Field from "./Field.model";
import Question from "./Question.model";
import Skill from "./Skill.model";
import Talent from "./Talent.model";
import Topic from "./Topic.model";
import User from "./User.model";

interface Assessment {

    code: string,
    title: string,
    type: string
    avatar: string,
    duration: {
        startAt: IISOSplit,
        dueAt: IISOSplit,
        time: number,
        expires: number
    }
    summary: IAssessmentSummary,
    slug: string,
    cutoff: number,
    status: string,
    reason: string
    levels: Array<string>,
    difficulties: Array<string>,
    questionTypes: Array<string>

    // relationships
    talent: Talent | any,
    business: string | any,
    questions: Array<Question | any>,
    choices: Array<IChoice>
    career: Career | any,
    fields: Array<Field | any>,
    topics: Array<Topic | any>,
    skills: Array<Skill | any>
    createdBy: User | any;

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: any;
    id: any;

}

export interface IChoice {
    question: Question | any,
    answer: string,
    score: number
}

export interface IAssessmentSummary {
    startedAt: IISOSplit,
    submittedAt: IISOSplit,
    timeLeft: number,
    submittedBy: string,
    message: string,
    score: number,
    percent: number,
    total: number,
    grade: IGrade,
    progress: number,
    points: number,
    bonusPoints: number,
    cutoffPoints: number
}

export interface IAsssessmentGrade {
    label: string,
    description: string
}

export interface IISOSplit {
    date: string,
    time: string,
    ISO: string
}

export default Assessment;