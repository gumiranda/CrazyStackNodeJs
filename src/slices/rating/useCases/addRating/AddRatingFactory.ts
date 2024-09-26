import { makeDatabaseInstance } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { addRating, AddRating } from "@/slices/rating/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddRatingFactory = (): AddRating => {
  const repository = new RatingRepository(
    makeDatabaseInstance(whiteLabel.database, "rating")
  );
  return addRating(repository);
};
