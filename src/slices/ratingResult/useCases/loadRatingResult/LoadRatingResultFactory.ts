import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import { loadRatingResult, LoadRatingResult } from "@/slices/ratingResult/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRatingResultFactory = (): LoadRatingResult => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance(whiteLabel.database, "ratingResult")
  );
  return loadRatingResult(repository);
};
