import { UpdateRouteDriverRepository } from "@/slices/routeDriver/repositories";
import { RouteDriverData } from "@/slices/routeDriver/entities";
import { Query } from "@/application/types";

export type UpdateRouteDriver = (
    query: Query,
    data: RouteDriverData
) => Promise<RouteDriverData | null>;
export type UpdateRouteDriverSignature = (
    updateRouteDriver: UpdateRouteDriverRepository
) => UpdateRouteDriver;
export const updateRouteDriver: UpdateRouteDriverSignature =
    (updateRouteDriverRepository: UpdateRouteDriverRepository) =>
    async (query: Query, data: RouteDriverData) => {
        return updateRouteDriverRepository.updateRouteDriver(query, data);
    };
