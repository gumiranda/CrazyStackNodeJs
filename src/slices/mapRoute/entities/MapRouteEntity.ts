import { RouteDriverData } from "@/slices/routeDriver/entities";

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
