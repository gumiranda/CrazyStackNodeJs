import { AddRouteDriverRepository } from "@/slices/routeDriver/repositories";
import { RouteDriverEntity, RouteDriverData } from "@/slices/routeDriver/entities";

export type AddRouteDriver = (data: RouteDriverData) => Promise<RouteDriverEntity | null>;
export type AddRouteDriverSignature = (addRouteDriver: AddRouteDriverRepository) => AddRouteDriver;
export const addRouteDriver: AddRouteDriverSignature =
    (addRouteDriverRepository: AddRouteDriverRepository) => (data: RouteDriverData) => {
        return addRouteDriverRepository.addRouteDriver(new RouteDriverEntity(data));
    };
