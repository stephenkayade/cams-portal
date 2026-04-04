import Plan, { IPlanTrial } from "./Plan.model";
import Talent from "./Talent.model";
import Transaction from "./Transaction.model";

interface Subscription {

    code: string,
    status: string,
    billing: IBilling,
    card: IDebitCard,
    slug: string,
    currency: string,
    trial: IPlanTrial,

    // relationships
    talent: Talent | any,
    plan: Plan | any,
    transactions: Array<Transaction | any>,
    features: Array<ISubscriptionFeature>

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: string;
    id: string;

}

export interface ISubscriptionFeature {
    name: string,
    displayName: string
    limit: number,
    description: string,
    category: 'base' | 'addon',
    enabledAt: string,
    pricing: {
        monthly: number,
        yearly: number,
    }
}

export interface IBilling {
    retries: number,
    startAt: any,
    paidAt: any,
    dueAt: any,
    graceAt: any,
    amount: {
        base: number,
        features: number
    },
    frequency: string,
    isPaid: boolean
}

export interface IDebitCard {
    authCode: string,
    cardBin: string,
    cardLast: string,
    expiryMonth: string,
    expiryYear: string,
    cardPan: string
}

export default Subscription;