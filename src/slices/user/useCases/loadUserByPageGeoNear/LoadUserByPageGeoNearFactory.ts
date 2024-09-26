import { MongoRepository, PostgresRepository } from "@/application/infra";
import { loadUserByPageGeoNear, LoadUserByPageGeoNear } from "@/slices/user/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { UserAggregateRepository } from "../../repositories/aggregates/mongodb/UserAggregateRepository";
import { UserAggregatePgRepository } from "../../repositories/aggregates/postgres/UserAggregatePgRepository";

export const makeLoadUserByPageGeoNearFactory = (): LoadUserByPageGeoNear => {
  return loadUserByPageGeoNear(makeAggregateRepository());
};
export const makeAggregateRepository = () => {
  if (whiteLabel.database === "mongodb") {
    return new UserAggregateRepository(new MongoRepository("users"));
  }
  return new UserAggregatePgRepository(new PostgresRepository("users"));
};
