import { makeDatabaseInstance } from "@/application/infra";
import { RatingResultRepository } from "@/slices/ratingResult/repositories";
import {
  loadRatingResultByPage,
  LoadRatingResultByPage,
} from "@/slices/ratingResult/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRatingResultByPageFactory = (): LoadRatingResultByPage => {
  const repository = new RatingResultRepository(
    makeDatabaseInstance(whiteLabel.database, "ratingResult")
  );
  return loadRatingResultByPage(repository);
};
