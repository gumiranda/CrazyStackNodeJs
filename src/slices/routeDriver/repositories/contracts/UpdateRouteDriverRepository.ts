import { Query } from "@/application/types";
import { RouteDriverData } from "@/slices/routeDriver/entities";

export interface UpdateRouteDriverRepository {
  updateRouteDriver(query: Query, data: RouteDriverData): Promise<RouteDriverData | null>;
  countRouteDrive(query: Query): Promise<number>;
}
