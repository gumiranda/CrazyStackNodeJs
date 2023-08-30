import { Query } from "@/application/types";
import { RatingData } from "@/slices/rating/entities";

export interface LoadRatingRepository {
  loadRating(query: Query): Promise<RatingData | null>;
}
