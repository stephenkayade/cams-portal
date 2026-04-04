import { collection } from "../_data/seed";
import { ICollection } from "./interfaces.util";

export const createCollection = (payload: any, emptyMessage: string): ICollection => {
    const body = payload && payload.data !== undefined ? payload.data : payload;
    const docs = body?.docs ? body.docs : Array.isArray(body) ? body : [];
    const limit = body?.limit || 25;

    return {
        ...collection,
        data: docs,
        count: payload?.count ?? body?.totalDocs ?? docs.length,
        total: payload?.total ?? body?.totalDocs ?? docs.length,
        pagination: payload?.pagination ?? {
            next: { page: body?.nextPage ?? null, limit },
            prev: { page: body?.prevPage ?? null, limit }
        },
        loading: false,
        message: docs.length > 0 ? `Displaying ${docs.length} record${docs.length > 1 ? 's' : ''}` : emptyMessage
    };
};

export const createQuery = (params: Record<string, any>) => {
    const query = new URLSearchParams();
    const appendValue = (key: string, value: any) => {
        if (value === null || value === undefined || value === '') {
            return;
        }

        query.append(key, String(value));
    };

    const serializePopulate = (value: any, prefix = ''): Array<string> => {
        if (value === null || value === undefined || value === '') {
            return [];
        }

        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            return [prefix ? `${prefix}.${value}` : String(value)];
        }

        if (Array.isArray(value)) {
            return value.flatMap((item) => serializePopulate(item, prefix));
        }

        if (typeof value === "object") {
            return Object.entries(value).flatMap(([childKey, childValue]) => {
                const nextPrefix = prefix ? `${prefix}.${childKey}` : childKey;
                return serializePopulate(childValue, nextPrefix);
            });
        }

        return [];
    };

    Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            return;
        }

        if (key === "_populate" && typeof value === "object") {
            serializePopulate(value).forEach((path) => appendValue(key, path));
            return;
        }

        if (Array.isArray(value)) {
            value.forEach((item) => {
                appendValue(key, item);
            });
            return;
        }

        appendValue(key, value);
    });

    return query.toString();
};
