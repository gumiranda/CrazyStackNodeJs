import { Repository } from "@/application/infra/contracts/repository";
import { PlaceData, PlacePaginated } from "@/slices/place/entities";
import {
  AddPlaceRepository,
  DeletePlaceRepository,
  LoadPlaceByPageRepository,
  LoadPlaceRepository,
  UpdatePlaceRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class PlaceRepository
  implements
    AddPlaceRepository,
    DeletePlaceRepository,
    LoadPlaceByPageRepository,
    LoadPlaceRepository,
    UpdatePlaceRepository
{
  constructor(private readonly repository: Repository) {}
  async addPlace(place: PlaceData): Promise<PlaceData | null> {
    return this.repository.add(place);
  }
  async deletePlace(query: Query): Promise<PlaceData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadPlaceByPage(query: Query): Promise<PlacePaginated | null> {
    const places = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      query?.options?.limitPerPage ?? 10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { places, total };
  }
  async loadPlace(query: Query): Promise<PlaceData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updatePlace(query: Query, data: PlaceData): Promise<PlaceData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
