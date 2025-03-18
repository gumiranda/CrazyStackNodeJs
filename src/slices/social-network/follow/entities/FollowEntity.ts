export type FollowData = {
  _id?: string;
  createdById: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FollowPaginated = {
  follows: FollowData[];
  total: number;
};

export class FollowEntity {
  createdById: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: FollowData) {
    this.createdById = data.createdById;
    this.userId = data.userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
