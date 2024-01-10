import { UpdateRouteDriverRepository } from "@/slices/routeDriver/repositories";
import { RouteDriverData } from "@/slices/routeDriver/entities";
import { Query } from "@/application/types";

export type UpdateRouteDriverOutput = {
  countRouteDriver: number;
  routeDriver: RouteDriverData | null;
};
export type UpdateRouteDriver = (
  query: Query,
  data: RouteDriverData
) => Promise<UpdateRouteDriverOutput>;
export type UpdateRouteDriverSignature = (
  updateRouteDriver: UpdateRouteDriverRepository
) => UpdateRouteDriver;
export const updateRouteDriver: UpdateRouteDriverSignature =
  (updateRouteDriverRepository: UpdateRouteDriverRepository) =>
  async (query: Query, data: RouteDriverData) => {
    const [routeDriver, countRouteDriver] = await Promise.all([
      updateRouteDriverRepository.updateRouteDriver(query, data),
      updateRouteDriverRepository.countRouteDrive({
        fields: { routeId: query?.fields?.routeId },
      }),
    ]);
    return { routeDriver, countRouteDriver };
  };
