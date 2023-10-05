import { Repository } from "@/application/infra/contracts/repository";
import { MapRouteData, MapRoutePaginated } from "@/slices/mapRoute/entities";
import {
  AddMapRouteRepository,
  DeleteMapRouteRepository,
  LoadMapRouteByPageRepository,
  LoadMapRouteRepository,
  UpdateMapRouteRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class MapRouteRepository
  implements
    AddMapRouteRepository,
    DeleteMapRouteRepository,
    LoadMapRouteByPageRepository,
    LoadMapRouteRepository,
    UpdateMapRouteRepository
{
  constructor(private readonly repository: Repository) {}
  async addMapRoute(mapRoute: MapRouteData): Promise<MapRouteData | null> {
    return this.repository.add(mapRoute);
  }
  async deleteMapRoute(query: Query): Promise<MapRouteData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadMapRouteByPage(query: Query): Promise<MapRoutePaginated | null> {
    const mapRoutes = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { mapRoutes, total };
  }
  async loadMapRoute(query: Query): Promise<MapRouteData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateMapRoute(query: Query, data: MapRouteData): Promise<MapRouteData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
