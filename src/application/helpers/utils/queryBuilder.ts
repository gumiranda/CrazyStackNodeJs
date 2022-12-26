export class QueryBuilder {
    private readonly query: any = [];
    match(data: any): QueryBuilder {
        this.query.push({ $match: data });
        return this;
    }
    group(data: any): QueryBuilder {
        this.query.push({ $group: data });
        return this;
    }
    count(data: any): QueryBuilder {
        this.query.push({ $count: data });
        return this;
    }
    geoNear(data: any): QueryBuilder {
        this.query.push({ $geoNear: data });
        return this;
    }
    project(data: any): QueryBuilder {
        this.query.push({ $project: data });
        return this;
    }
    skip(data: any): QueryBuilder {
        this.query.push({ $skip: data });
        return this;
    }
    limit(data: any): QueryBuilder {
        this.query.push({ $limit: data });
        return this;
    }
    lookup(data: any): QueryBuilder {
        this.query.push({ $lookup: data });
        return this;
    }
    sort(data: any): QueryBuilder {
        this.query.push({ $sort: data });
        return this;
    }
    unwind(data: any): QueryBuilder {
        this.query.push({ $unwind: data });
        return this;
    }
    build(): QueryBuilder {
        return this.query;
    }
}
