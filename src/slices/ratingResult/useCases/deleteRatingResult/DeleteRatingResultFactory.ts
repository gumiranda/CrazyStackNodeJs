import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { deleteRatingResult, DeleteRatingResult } from "@/slices/ratingResult/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteRatingResultFactory = (): DeleteRatingResult => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance(whiteLabel.database, "ratingResult")
  );
  return deleteRatingResult(repository);
};
