import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { addRatingResult, AddRatingResult } from "@/slices/ratingResult/useCases";

export const makeAddRatingResultFactory = (): AddRatingResult => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance("mongodb", "ratingResult")
  );
  return addRatingResult(repository);
};
