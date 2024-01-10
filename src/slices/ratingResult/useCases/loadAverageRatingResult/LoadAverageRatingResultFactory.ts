import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import {
  loadAverageRatingResult,
  LoadAverageRatingResult,
} from "@/slices/ratingResult/useCases";

export const makeLoadAverageRatingResultFactory = (): LoadAverageRatingResult => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return loadAverageRatingResult(repository);
};
