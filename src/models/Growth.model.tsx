import Career from "./Career.model";
import Talent from "./Talent.model";

export interface Growth {
    code: string,
    level: string,
    weekNumber: number,
    weekName: string,
    percentile: number,
    chart: Array<{
        name: string;
        value: number;
        plot: number;
    }>
    slug: string

    talent: Talent | any
    career: Career | any

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: string;
    id: string;
}

export default Growth;