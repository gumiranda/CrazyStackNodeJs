import { makeDatabaseInstance } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { deleteRating, DeleteRating } from "@/slices/rating/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteRatingFactory = (): DeleteRating => {
  const repository = new RatingRepository(
    makeDatabaseInstance(whiteLabel.database, "rating")
  );
  return deleteRating(repository);
};
