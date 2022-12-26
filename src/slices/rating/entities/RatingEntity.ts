export type RatingStarsModel = {
    rating: string;
    stars: number;
};
export type RatingData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ratingType: string;
    ratings: RatingStarsModel[];
};

export type RatingPaginated = {
    ratings: RatingData[];
    total: number;
};

export class RatingEntity {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    ratingType: string;
    ratings: RatingStarsModel[];
    constructor(data: RatingData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.ratingType = data.ratingType;
        this.ratings = data.ratings;
    }
}
