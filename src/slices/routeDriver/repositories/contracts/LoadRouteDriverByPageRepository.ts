import { Query } from "@/application/types";
import { RouteDriverPaginated } from "@/slices/routeDriver/entities";

export interface LoadRouteDriverByPageRepository {
  loadRouteDriverByPage(query: Query): Promise<RouteDriverPaginated | null>;
}
