import { Query } from "@/application/types";
import { RouteDriverData } from "@/slices/routeDriver/entities";

export interface DeleteRouteDriverRepository {
    deleteRouteDriver(query: Query): Promise<RouteDriverData | null>;
}
