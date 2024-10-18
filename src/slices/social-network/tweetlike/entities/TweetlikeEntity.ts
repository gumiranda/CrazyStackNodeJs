export type TweetlikeData = {
    _id?: string;
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TweetlikePaginated = {
    tweetlikes: TweetlikeData[];
    total: number;
};

export class TweetlikeEntity {
    createdById: string;
    name: string;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(data: TweetlikeData) {
        this.createdById = data.createdById;
        this.name = data.name;
        this.active = false;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
