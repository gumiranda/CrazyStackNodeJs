import { DeleteRouteDriverRepository } from "@/slices/routeDriver/repositories";
import { RouteDriverData } from "@/slices/routeDriver/entities";
import { Query } from "@/application/types";

export type DeleteRouteDriver = (query: Query) => Promise<RouteDriverData | null>;
export type DeleteRouteDriverSignature = (
    deleteRouteDriver: DeleteRouteDriverRepository
) => DeleteRouteDriver;
export const deleteRouteDriver: DeleteRouteDriverSignature =
    (deleteRouteDriverRepository: DeleteRouteDriverRepository) => (query: Query) => {
        return deleteRouteDriverRepository.deleteRouteDriver(query);
    };
