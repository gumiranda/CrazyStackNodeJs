import { makeDatabaseInstance } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { loadRating, LoadRating } from "@/slices/rating/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadRatingFactory = (): LoadRating => {
  const repository = new RatingRepository(
    makeDatabaseInstance(whiteLabel.database, "rating")
  );
  return loadRating(repository);
};
