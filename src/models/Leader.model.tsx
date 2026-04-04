import { IUserCountry } from "../utils/interfaces.util"
import { ITalentBadge, ITalentCareer } from "./Talent.model"
import User from "./User.model"

interface Leader {

    code: string,
    username: string,
    firstName: string,
    lastName: string,
    avatar: string,
    email: string,
    phoneNumber: string,
    phoneCode: string,
    countryPhone: string
    country: IUserCountry,
    homeCountry: IUserCountry,
    gender: string
    rank: number,
    rankLabel: string,
    level: string,
    points: number

    // relationships
    user: User | any
    settings: string | any
    careers: Array<ITalentCareer>
    badges: Array<ITalentBadge>

    // time stamps
    createdAt: string;
    updatedAt: string;

    // unique ids
    _id: string;
    id: string;
}

export default Leader