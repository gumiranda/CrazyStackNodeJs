import { makeDatabaseInstance } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { loadRatingByPage, LoadRatingByPage } from "@/slices/rating/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRatingByPageFactory = (): LoadRatingByPage => {
  const repository = new RatingRepository(
    makeDatabaseInstance(whiteLabel.database, "rating")
  );
  return loadRatingByPage(repository);
};
