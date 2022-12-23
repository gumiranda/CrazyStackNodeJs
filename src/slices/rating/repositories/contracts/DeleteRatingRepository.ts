import { Query } from "@/application/types";
import { RatingData } from "@/slices/rating/entities";

export interface DeleteRatingRepository {
  deleteRating(query: Query): Promise<RatingData | null>;
}
