import { LoadRouteDriverRepository } from "@/slices/routeDriver/repositories";
import { RouteDriverData } from "@/slices/routeDriver/entities";
import { Query } from "@/application/types";

export type LoadRouteDriver = (query: Query) => Promise<RouteDriverData | null>;
export type LoadRouteDriverSignature = (loadRouteDriver: LoadRouteDriverRepository) => LoadRouteDriver;
export const loadRouteDriver: LoadRouteDriverSignature =
    (loadRouteDriverRepository: LoadRouteDriverRepository) => async (query: Query) => {
        return loadRouteDriverRepository.loadRouteDriver(query);
    };
