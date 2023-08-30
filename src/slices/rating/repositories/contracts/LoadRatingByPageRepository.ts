import { Query } from "@/application/types";
import { RatingPaginated } from "@/slices/rating/entities";

export interface LoadRatingByPageRepository {
  loadRatingByPage(query: Query): Promise<RatingPaginated | null>;
}
