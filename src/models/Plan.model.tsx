interface Plan {
    code: string,
    label: string,
    planType: string,
    name: string,
    displayName: string,
    isEnabled: boolean,
    description: string,
    trial: IPlanTrial,
    pricing: IPlanPricing,
    features: Array<IPlanFeature>
    slug: string

    // time stamps
    createdAt: string;
    updatedAt: string;
    _version: number;
    _id: string;
    id: string;

}

export interface IPlanFeature {
    name: string,
    displayName: string
    category: 'base' | 'addon',
    description: string,
    limit: number,
    isEnabled: boolean,
    status: string,
    modules: Array<Record<string, string>>
    frequency: string,
    pricing: IPlanPricing
}

export interface IPlanPricing {
    naira: {
        monthly: number,
        yearly: number,
    },
    dollar: {
        monthly: number,
        yearly: number,
    }
}

export interface IPlanTrial {
    days: number,
    enabled: boolean
}

export default Plan;