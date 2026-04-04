import Talent from "./Talent.model";
import User from "./User.model";

interface Ticket {
    
    title: string,
    type: string,
    topic: string,
    code: string,
    body: string,
    marked: string,
    permalink: string,
    status: string,
    isEnabled: boolean,
    slug: String

    // relationships
    talent: Talent | any;
    createdBy: User | any;

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: string;
    id: string;

}

export default Ticket;