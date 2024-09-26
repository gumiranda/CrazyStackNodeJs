import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { ObjectId } from "mongodb";
import {
  mapQueryParamsToQueryMongo,
  mountGeoNearQuery,
} from "@/application/infra/database/mongodb";
import { QueryBuilder } from "@/application/helpers/utils/queryBuilder";
import { LoadUserByPageGeoNearRepository } from "../../contracts/LoadUserByPageGeoNearRepository";
import { UserPaginated } from "../../../entities";
export class UserAggregateRepository implements LoadUserByPageGeoNearRepository {
  constructor(private readonly repository: Repository) {}
  async loadUserByPageGeoNear(query: Query): Promise<UserPaginated | null> {
    if (!query?.options?.userLoggedId) {
      return null;
    }
    const { coord = null } =
      (await this.repository.getOne(
        { _id: new ObjectId(query?.options?.userLoggedId) },
        { projection: { password: 0 } }
      )) || {};
    const queryMongo = mapQueryParamsToQueryMongo({
      ...((query?.fields ?? {}) as object),
      active: true,
      _id: { $ne: new ObjectId(query?.options?.userLoggedId) },
    });
    if (queryMongo?.$text) {
      const resultPaginatedArray =
        (await this.repository.getPaginate(
          query?.options?.page ?? 0,
          queryMongo,
          query?.options?.sort ?? { createdAt: -1 },
          10,
          query?.options?.projection ?? {}
        )) ?? [];
      const totalPaginated = (await this.repository.getCount(queryMongo)) ?? 0;
      return { users: resultPaginatedArray, total: totalPaginated };
    }
    if (!coord?.coordinates) return null;
    const { coordinates } = coord;
    const queryBuilded = new QueryBuilder()
      .geoNear(mountGeoNearQuery({ query: queryMongo, coordinates }))
      .sort({ distance: 1 })
      .skip(((query?.options?.page ?? 0) - 1) * 10)
      .limit(10)
      .project({ password: 0 })
      .build();
    const totalQueryBuilded = new QueryBuilder()
      .geoNear(mountGeoNearQuery({ query: queryMongo, coordinates }))
      .count("name")
      .build();
    const resultGeoNearPaginatedArray =
      (await this.repository.aggregate(queryBuilded)) ?? [];
    const totalResult = (await this.repository.aggregate(totalQueryBuilded)) ?? null;
    const total = totalResult?.[0]?.name ?? 0;
    return { users: resultGeoNearPaginatedArray, total };
  }
}
