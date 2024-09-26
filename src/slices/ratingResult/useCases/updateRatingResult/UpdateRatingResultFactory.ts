import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { updateRatingResult, UpdateRatingResult } from "@/slices/ratingResult/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateRatingResultFactory = (): UpdateRatingResult => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance(whiteLabel.database, "ratingResult")
  );
  return updateRatingResult(repository);
};
