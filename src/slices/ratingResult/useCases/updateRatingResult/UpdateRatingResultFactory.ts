import { MongoRepository } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { updateRatingResult, UpdateRatingResult } from "@/slices/ratingResult/useCases";

export const makeUpdateRatingResultFactory = (): UpdateRatingResult => {
  const repository = new RatingResultRepository(new MongoRepository("ratingResult"));
  return updateRatingResult(repository);
};
