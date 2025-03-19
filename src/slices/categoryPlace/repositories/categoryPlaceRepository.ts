import { Repository } from "@/application/infra/contracts/repository";
import {
  CategoryPlaceData,
  CategoryPlacePaginated,
} from "@/slices/categoryPlace/entities";
import {
  AddCategoryPlaceRepository,
  DeleteCategoryPlaceRepository,
  LoadCategoryPlaceByPageRepository,
  LoadCategoryPlaceRepository,
  UpdateCategoryPlaceRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class CategoryPlaceRepository
  implements
    AddCategoryPlaceRepository,
    DeleteCategoryPlaceRepository,
    LoadCategoryPlaceByPageRepository,
    LoadCategoryPlaceRepository,
    UpdateCategoryPlaceRepository
{
  constructor(private readonly repository: Repository) {}
  async addCategoryPlace(
    categoryPlace: CategoryPlaceData
  ): Promise<CategoryPlaceData | null> {
    return this.repository.add(categoryPlace);
  }
  async deleteCategoryPlace(query: Query): Promise<CategoryPlaceData | null> {
    return this.repository.deleteOne(query?.fields);
  }
  async loadCategoryPlaceByPage(query: Query): Promise<CategoryPlacePaginated | null> {
    const categoryPlaces = await this.repository.getPaginate(
      query?.options?.page ?? 0,
      query?.fields ?? {},
      query?.options?.sort ?? { createdAt: -1 },
      query?.options?.limitPerPage ?? 10,
      query?.options?.projection ?? {}
    );
    const total = await this.repository.getCount(query?.fields ?? {});
    return { categoryPlaces, total };
  }
  async loadCategoryPlace(query: Query): Promise<CategoryPlaceData | null> {
    return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
  }
  async updateCategoryPlace(
    query: Query,
    data: CategoryPlaceData
  ): Promise<CategoryPlaceData | null> {
    return this.repository.update(query?.fields ?? {}, data);
  }
}
