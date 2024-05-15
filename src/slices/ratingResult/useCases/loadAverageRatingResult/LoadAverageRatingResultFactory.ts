import { MongoRepository } from "@/application/infra";
import {
  loadAverageRatingResult,
  LoadAverageRatingResult,
} from "@/slices/ratingResult/useCases";
import { RatingResultAggregateRepository } from "../../repositories/aggregates/ratingResultAggregateRepository";

export const makeLoadAverageRatingResultFactory = (): LoadAverageRatingResult => {
  const repository = new RatingResultAggregateRepository(
    new MongoRepository("ratingResult")
  );
  return loadAverageRatingResult(repository);
};
