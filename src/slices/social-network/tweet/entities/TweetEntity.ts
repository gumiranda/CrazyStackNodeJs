export type TweetData = {
  _id?: string;
  createdById: string;
  userSlug: string;
  body: string;
  image?: string;
  tweetId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TweetPaginated = {
  tweets: TweetData[];
  total: number;
};

export class TweetEntity {
  createdById: string;
  userSlug: string;
  createdAt?: Date;
  updatedAt?: Date;
  body: string;
  image?: string;
  tweetId?: string;
  constructor(data: TweetData) {
    this.createdById = data.createdById;
    this.userSlug = data.userSlug;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.body = data.body;
    this.image = data.image;
    this.tweetId = data.tweetId;
  }
}
