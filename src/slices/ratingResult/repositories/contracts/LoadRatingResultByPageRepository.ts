import { Query } from "@/application/types";
import { RatingResultPaginated } from "@/slices/ratingResult/entities";

export interface LoadRatingResultByPageRepository {
  loadRatingResultByPage(query: Query): Promise<RatingResultPaginated | null>;
}
