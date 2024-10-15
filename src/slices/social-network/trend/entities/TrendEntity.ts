export type TrendData = {
  _id?: string;
  hashtag: string;
  counter?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TrendPaginated = {
  trends: TrendData[];
  total: number;
};

export class TrendEntity {
  hashtag: string;
  createdAt?: Date;
  updatedAt?: Date;
  counter?: number;

  constructor(data: TrendData) {
    this.hashtag = data.hashtag;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.counter = 1;
  }
}
