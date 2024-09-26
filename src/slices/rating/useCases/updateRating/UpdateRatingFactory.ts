import { makeDatabaseInstance } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { updateRating, UpdateRating } from "@/slices/rating/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateRatingFactory = (): UpdateRating => {
  const repository = new RatingRepository(
    makeDatabaseInstance(whiteLabel.database, "rating")
  );
  return updateRating(repository);
};
