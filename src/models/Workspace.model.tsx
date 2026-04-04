import Business from "./Business.model";
import Talent from "./Talent.model";

interface Workspace {

    code: string,
    owner: string,
    type: string,
    name: string,
    logo: string,
    isDefault: boolean,
    feature: IWorkspaceFeature,
    slug: string

    // relationships
    talent: Talent | any,
    business: Talent | any,

    // time stamps
    createdAt: string,
    updatedAt: string,
    _version: number,
    _id: string,
    id: string,

}

export interface IWorkspaceFeature {
    upgrade: boolean,
    billing: boolean,
    referral: boolean,
    roadmaps: {
        personal: boolean,
        business: boolean
    },
    tasks: {
        personal: boolean,
        business: boolean
    },
    assessments: {
        personal: boolean,
        business: boolean
    },
    projects: {
        personal: boolean,
        business: boolean
    },
    growth: boolean,
}

export interface IPersonalWorkspace {
    id: Talent | any,
    type: string,
    name: string,
    isDefault: boolean,
    feature: IWorkspaceFeature,
}

export interface IBusinessWorkspace {
    id: Business | any,
    type: string,
    business: {
        name: string,
        email: string,
        location: {
            city: string,
            state: string,
            address: string,
        }
    },
    name: string,
    logo: string,
    isDefault: boolean,
    feature: IWorkspaceFeature,
}

export default Workspace;