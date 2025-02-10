export type TweetlikeData = {
  _id?: string;
  createdById: string;
  userSlug: string;
  tweetId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TweetlikePaginated = {
  tweetlikes: TweetlikeData[];
  total: number;
};

export class TweetlikeEntity {
  createdById: string;
  userSlug: string;
  tweetId: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: TweetlikeData) {
    this.createdById = data.createdById;
    this.userSlug = data.userSlug;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.tweetId = data.tweetId;
  }
}
