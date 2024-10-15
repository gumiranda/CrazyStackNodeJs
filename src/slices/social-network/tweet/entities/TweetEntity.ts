export type TweetData = {
  _id?: string;
  createdById: string;
  userSlug: string;
  body: string;
  image?: string;
  answerOf: number;
  active?: boolean;
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
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  body: string;
  image?: string;
  answerOf: number;
  constructor(data: TweetData) {
    this.createdById = data.createdById;
    this.userSlug = data.userSlug;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.body = data.body;
    this.image = data.image;
    this.answerOf = data.answerOf;
  }
}
