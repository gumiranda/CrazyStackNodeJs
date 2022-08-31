import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { loadRatingResult, LoadRatingResult } from "@/slices/ratingResult/useCases";

export const makeLoadRatingResultFactory = (): LoadRatingResult => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return loadRatingResult(repository);
};
