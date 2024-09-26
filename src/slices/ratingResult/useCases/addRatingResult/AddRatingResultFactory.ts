import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { addRatingResult, AddRatingResult } from "@/slices/ratingResult/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddRatingResultFactory = (): AddRatingResult => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance(whiteLabel.database, "ratingResult")
  );
  return addRatingResult(repository);
};
