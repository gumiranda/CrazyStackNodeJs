export type MapRouteData = {
  _id?: string;
  createdById: string;
  name: string;
  source: Place;
  destination: Place;
  distance: number;
  duration: number;
  directions: string;
  routeDriver: RouteDriverData[];
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type MapRoutePaginated = {
  mapRoutes: MapRouteData[];
  total: number;
};

export class MapRouteEntity {
  createdById: string;
  name: string;
  source: Place;
  destination: Place;
  distance: number;
  duration: number;
  directions: string;
  routeDriver: RouteDriverData[];
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: MapRouteData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.source = data.source;
    this.destination = data.destination;
    this.distance = data.distance;
    this.duration = data.duration;
    this.directions = data.directions;
    this.routeDriver = data.routeDriver;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
export type Place = {
  name: string;
  location: Coord;
};
export type Point = {
  location: Coord;
  createdAt: Date;
};
export type Coord = {
  lat: number;
  lng: number;
};
export type RouteDriverData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  routeId: string;
  points: Point[];
  status: string; //FINALIZADO, INICIADO, ETC
  createdAt?: Date;
  updatedAt?: Date;
};

export type RouteDriverPaginated = {
  routeDrivers: RouteDriverData[];
  total: number;
};

export class RouteDriverEntity {
  createdById: string;
  name: string;
  active?: boolean;
  routeId: string;
  points: Point[];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  constructor(data: RouteDriverData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.routeId = data.routeId;
    this.points = data.points;
    this.status = data.status;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
