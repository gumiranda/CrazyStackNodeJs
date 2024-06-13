import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";
import { LoadUserByPageGeoNearRepository } from "../../contracts/LoadUserByPageGeoNearRepository";
import { UserPaginated } from "../../../entities";
import { SQLQueryBuilder } from "@/application/helpers";
export class UserAggregatePgRepository implements LoadUserByPageGeoNearRepository {
  constructor(private readonly repository: Repository) {}
  async loadUserByPageGeoNear(query: Query): Promise<UserPaginated | null> {
    if (!query?.options?.userLoggedId) {
      return null;
    }
    const page = query?.options?.page ?? 0;
    const limitPerPage = query?.options?.limitPerPage ?? 10;
    const queryBuilded = new SQLQueryBuilder("users")
      .projectWithDistance(query?.fields?.lng, query?.fields?.lat)
      .match(
        "users.coord->'coordinates'->>0 IS NOT NULL AND users.coord->'coordinates'->>1 IS NOT NULL AND users._id != $3 "
      )
      .addValue(query?.options?.userLoggedId)
      .sortByDistance(query?.fields?.lng, query?.fields?.lat)
      .skip((page - 1) * limitPerPage)
      .limit(limitPerPage)
      .build();
    const result = await this.repository.aggregate(queryBuilded);
    return { users: mapPassword(result ?? []), total: limitPerPage };
  }
}
export const mapPassword = (users: any) => {
  return users.map((user: any) => {
    delete user.password;
    return user;
  });
};
