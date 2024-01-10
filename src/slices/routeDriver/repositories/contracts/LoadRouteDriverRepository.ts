import { Query } from "@/application/types";
import { RouteDriverData } from "@/slices/routeDriver/entities";

export interface LoadRouteDriverRepository {
  loadRouteDriver(query: Query): Promise<RouteDriverData | null>;
}
