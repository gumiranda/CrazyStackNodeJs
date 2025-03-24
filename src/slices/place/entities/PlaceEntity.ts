export type PlaceData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categoryPlaceId: string | null;
  ownerId?: string;
  description?: string;
  coord?: any;
  address?: string;
  phone?: string;
  cover?: string;
  profilephoto?: string;
};

export type PlacePaginated = {
  places: PlaceData[];
  total: number;
};

export class PlaceEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categoryPlaceId: string | null;
  ownerId?: string;
  description?: string;
  coord?: any;
  address?: string;
  phone?: string;
  cover?: string;
  profilephoto?: string;
  constructor(data: PlaceData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.categoryPlaceId = data.categoryPlaceId;
    this.ownerId = data.ownerId;
    this.description = data.description;
    this.coord = data.coord;
    this.address = data.address;
    this.phone = data.phone;
    this.cover = data.cover;
    this.profilephoto = data.profilephoto;
  }
}
