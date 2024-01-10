import { Point } from "@/slices/mapRoute/entities";

export type RouteDriverData = {
  _id?: string;
  createdById: string;
  name: string;
  routeId: string;
  points: Point[];
  status: string; //FINALIZADO, INICIADO, ETC
  active?: boolean;
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
