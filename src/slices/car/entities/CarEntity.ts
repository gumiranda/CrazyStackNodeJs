export type CarData = {
  _id?: string;
  createdById: string;
  name: string;
  brand: string;
  about: string;
  fuel_type: string;
  thumbnail: string;
  rent: {
    period: string;
    price: number;
  };
  photos: string[];
  speed: string;
  acceleration: string;
  force: string;
  gas: string;
  exchange: string;
  people: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CarPaginated = {
  cars: CarData[];
  total: number;
};

export class CarEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  brand: string;
  about: string;
  fuel_type: string;
  thumbnail: string;
  rent: {
    period: string;
    price: number;
  };
  photos: string[];
  speed: string;
  acceleration: string;
  force: string;
  gas: string;
  exchange: string;
  people: string;
  constructor(data: CarData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.brand = data.brand;
    this.about = data.about;
    this.fuel_type = data.fuel_type;
    this.thumbnail = data.thumbnail;
    this.rent = data.rent;
    this.photos = data.photos;
    this.speed = data.speed;
    this.acceleration = data.acceleration;
    this.force = data.force;
    this.gas = data.gas;
    this.exchange = data.exchange;
    this.people = data.people;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
