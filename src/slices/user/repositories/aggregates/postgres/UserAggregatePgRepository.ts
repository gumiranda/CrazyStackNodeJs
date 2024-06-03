import { Repository } from "@/application/infra/contracts/repository";
import { Query } from "@/application/types";

import { LoadUserByPageGeoNearRepository } from "../../contracts/LoadUserByPageGeoNearRepository";
import { UserPaginated } from "../../../entities";
export class UserAggregatePgRepository implements LoadUserByPageGeoNearRepository {
  constructor(private readonly repository: Repository) {}
  async loadUserByPageGeoNear(query: Query): Promise<UserPaginated | null> {
    if (!query?.options?.userLoggedId) {
      return null;
    }
    return { users: [], total: 0 };
  }
}
