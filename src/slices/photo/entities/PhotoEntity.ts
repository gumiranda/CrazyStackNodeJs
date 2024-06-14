export type PhotoData = {
  _id?: string;
  createdById?: string;
  title: string;
  url?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PhotoPaginated = {
  photos: PhotoData[];
  total: number;
};

export class PhotoEntity {
  _id?: string;
  createdById?: string;
  title: string;
  active?: boolean;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: PhotoData) {
    this.createdById = data.createdById;
    this.title = data.title;
    this.url = data.url;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
