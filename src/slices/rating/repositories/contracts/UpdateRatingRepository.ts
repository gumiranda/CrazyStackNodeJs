import { Query } from "@/application/types";
import { RatingData } from "@/slices/rating/entities";

export interface UpdateRatingRepository {
  updateRating(query: Query, data: RatingData): Promise<RatingData | null>;
}
