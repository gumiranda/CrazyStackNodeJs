import { MongoRepository, PostgresRepository } from "@/application/infra";
import { loadPlaceByPageGeoNear, LoadPlaceByPageGeoNear } from "@/slices/place/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PlaceAggregateRepository } from "../../repositories/aggregates/mongodb/PlaceAggregateRepository";
import { PlaceAggregatePgRepository } from "../../repositories/aggregates/postgres/PlaceAggregatePgRepository";

export const makeLoadPlaceByPageGeoNearFactory = (): LoadPlaceByPageGeoNear => {
  return loadPlaceByPageGeoNear(makeAggregateRepository());
};
export const makeAggregateRepository = () => {
  if (whiteLabel.database === "mongodb") {
    return new PlaceAggregateRepository(new MongoRepository("place"));
  }
  return new PlaceAggregatePgRepository(new PostgresRepository("place"));
};
