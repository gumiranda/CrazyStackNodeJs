export type Query = {
    fields: unknown;
    options?: QueryOptions;
};

export type QueryOptions = {
    projection?: unknown;
    sort?: unknown;
    page?: number;
    limit?: number;
    userLoggedId?: string;
    indexToCreate?: any;
};
