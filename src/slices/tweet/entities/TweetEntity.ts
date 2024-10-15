export type TweetData = {
  _id?: string;
  createdById: string;
  userSlug: string;
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
  constructor(data: TweetData) {
    this.createdById = data.createdById;
    this.userSlug = data.userSlug;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
