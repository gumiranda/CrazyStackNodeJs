type RatingResultStarsModel = {
    rating: string;
    stars: number;
    comment: any;
    count: number;
    percent: number;
};
export type RatingResultData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ratingId: string;
    rating?: string;
    comment?: string;
    requestId: string;
    ratingType: string;
    ratingForId: string;
    ratings: RatingResultStarsModel[];
};
export type RatingResultAverage = {
    ratingId: string;
    ratingType: string;
    createdAt: Date;
    starsAvg: number;
    ratings: Array<{
        count: number;
        stars: number;
        percent: number;
        rating: string;
        comments: any;
    }>;
};

export type RatingResultPaginated = {
    ratingResults: RatingResultData[];
    total: number;
};

export class RatingResultEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ratingId: string;
    rating?: string;
    comment?: string;
    requestId: string;
    ratingType: string;
    ratingForId: string;
    ratings: RatingResultStarsModel[];
    constructor(data: RatingResultData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.ratingId = data.ratingId;
        this.requestId = data.requestId;
        this.ratingType = data.ratingType;
        this.ratingForId = data.ratingForId;
        this.ratings = data.ratings;
        this.rating = data.rating;
        this.comment = data.comment;
    }
}
