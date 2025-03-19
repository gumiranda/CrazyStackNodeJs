import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { LoadPlaceByPageGeoNearRepository } from "../../contracts/LoadPlaceByPageGeoNearRepository";
import { PlacePaginated } from "../../../entities";
import { SQLQueryBuilder } from "@/application/helpers";
export class PlaceAggregatePgRepository implements LoadPlaceByPageGeoNearRepository {
  constructor(private readonly repository: Repository) {}
  async loadPlaceByPageGeoNear(query: Query): Promise<PlacePaginated | null> {
    if (!query?.options?.userLoggedId) {
      return null;
    }
    const page = query?.options?.page ?? 0;
    const limitPerPage = query?.options?.limitPerPage ?? 10;
    const queryBuilded = new SQLQueryBuilder("place")
      .projectWithDistance(query?.fields?.lng, query?.fields?.lat)
      .match(
        "place.coord->'coordinates'->>0 IS NOT NULL AND place.coord->'coordinates'->>1 IS NOT NULL AND place._id != $3 "
      )
      .addValue(query?.options?.userLoggedId)
      .sortByDistance(query?.fields?.lng, query?.fields?.lat)
      .skip((page - 1) * limitPerPage)
      .limit(limitPerPage)
      .build();
    const result = await this.repository.aggregate(queryBuilded);
    return { places: result ?? [], total: limitPerPage };
  }
}
