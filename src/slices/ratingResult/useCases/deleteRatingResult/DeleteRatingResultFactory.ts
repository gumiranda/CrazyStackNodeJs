import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { deleteRatingResult, DeleteRatingResult } from "@/slices/ratingResult/useCases";

export const makeDeleteRatingResultFactory = (): DeleteRatingResult => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance("mongodb", "ratingResult")
  );
  return deleteRatingResult(repository);
};
