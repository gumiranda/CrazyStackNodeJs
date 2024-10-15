export type FollowData = {
  _id?: string;
  createdById: string;
  user1Slug: string;
  user2Slug: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FollowPaginated = {
  follows: FollowData[];
  total: number;
};

export class FollowEntity {
  createdById: string;
  user1Slug: string;
  user2Slug: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: FollowData) {
    this.createdById = data.createdById;
    this.user1Slug = data.user1Slug;
    this.user2Slug = data.user2Slug;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
