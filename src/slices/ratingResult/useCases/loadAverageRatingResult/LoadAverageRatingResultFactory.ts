import { MongoRepository, PostgresRepository } from "@/application/infra";
import {
  loadAverageRatingResult,
  LoadAverageRatingResult,
} from "@/slices/ratingResult/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { RatingResultAggregatePgRepository } from "../../repositories/aggregates/postgres/ratingResultAggregatePgRepository";
import { RatingResultAggregateRepository } from "../../repositories/aggregates/mongodb/ratingResultAggregateRepository";

export const makeLoadAverageRatingResultFactory = (): LoadAverageRatingResult => {
  return loadAverageRatingResult(makeAggregateRepository());
};
export const makeAggregateRepository = () => {
  if (whiteLabel.database === "mongodb") {
    return new RatingResultAggregateRepository(new MongoRepository("ratingResult"));
  }
  return new RatingResultAggregatePgRepository(new PostgresRepository("ratingResult"));
};
