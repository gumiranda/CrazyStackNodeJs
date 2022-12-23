import { MongoRepository } from "@/application/infra";
import { RatingRepository } from "@/slices/rating/repositories";
import { deleteRating, DeleteRating } from "@/slices/rating/useCases";

export const makeDeleteRatingFactory = (): DeleteRating => {
  const repository = new RatingRepository(new MongoRepository("rating"));
  return deleteRating(repository);
};
