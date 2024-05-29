import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { updateRatingResult, UpdateRatingResult } from "@/slices/ratingResult/useCases";

export const makeUpdateRatingResultFactory = (): UpdateRatingResult => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance("mongodb", "ratingResult")
  );
  return updateRatingResult(repository);
};
