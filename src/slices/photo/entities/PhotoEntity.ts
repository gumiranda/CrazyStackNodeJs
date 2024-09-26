export type PhotoData = {
  _id?: string;
  createdById?: string;
  key: string;
  provider: string;
  url?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  expiresIn?: Date;
  expiresInSeconds?: number;
};

export type PhotoPaginated = {
  photos: PhotoData[];
  total: number;
};

export class PhotoEntity {
  _id?: string;
  createdById?: string;
  key: string;
  provider: string;
  active?: boolean;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresIn?: Date;
  expiresInSeconds?: number;

  constructor(data: PhotoData) {
    this.createdById = data.createdById;
    this.key = data.key;
    this.key = data.key;
    this.provider = data.provider;
    this.url = data.url;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.expiresIn = data.expiresIn;
    this.expiresInSeconds = data.expiresInSeconds;
  }
}
