import { LoadRouteDriverByPageRepository } from "@/slices/routeDriver/repositories";
import { RouteDriverPaginated } from "@/slices/routeDriver/entities";
import { Query } from "@/application/types";

export type LoadRouteDriverByPage = (query: Query) => Promise<RouteDriverPaginated | null>;
export type LoadRouteDriverByPageSignature = (
    loadRouteDriverByPage: LoadRouteDriverByPageRepository
) => LoadRouteDriverByPage;
export const loadRouteDriverByPage: LoadRouteDriverByPageSignature =
    (loadRouteDriverByPageRepository: LoadRouteDriverByPageRepository) =>
    async (query: Query) => {
        return loadRouteDriverByPageRepository.loadRouteDriverByPage(query);
    };
