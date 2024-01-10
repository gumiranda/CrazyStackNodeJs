import { RouteDriverData } from "@/slices/routeDriver/entities";

export interface AddRouteDriverRepository {
  addRouteDriver(routeDriver: RouteDriverData): Promise<RouteDriverData | null>;
}
