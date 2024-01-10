import { Repository } from "@/application/infra/contracts/repository";
import { RouteDriverData, RouteDriverPaginated } from "@/slices/routeDriver/entities";
import {
  AddRouteDriverRepository,
  DeleteRouteDriverRepository,
  LoadRouteDriverByPageRepository,
  LoadRouteDriverRepository,
  UpdateRouteDriverRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class RouteDriverRepository
  implements
    AddRouteDriverRepository,
    DeleteRouteDriverRepository,
    LoadRouteDriverByPageRepository,
    LoadRouteDriverRepository,
    UpdateRouteDriverRepository
{
  constructor(private readonly repository: Repository) {}
  async addRouteDriver(routeDriver: RouteDriverData): Promise<RouteDriverData | null> {
    return this.repository.add(routeDriver);
  }
  async deleteRouteDriver(query: Query): Promise<RouteDriverData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadRouteDriverByPage(query: Query): Promise<RouteDriverPaginated | null> {
    const routeDrivers = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { routeDrivers, total };
  }
  async countRouteDrive(query: Query): Promise<number> {
    const total = (await this.repository.getCount(query?.fields ?? {})) ?? 0;
    return total;
  }
  async loadRouteDriver(query: Query): Promise<RouteDriverData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateRouteDriver(
    query: Query,
    data: RouteDriverData
  ): Promise<RouteDriverData | null> {
    return this.repository.upsertAndPush(
      { routeId: query?.fields?.routeId, _id: query?.fields?._id } ?? {},
      data,
      {
        points: { location: { lat: query?.fields?.lat, lng: query?.fields?.lng } },
      }
    );
  }
}
