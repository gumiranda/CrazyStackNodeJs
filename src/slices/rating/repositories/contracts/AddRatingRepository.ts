import { RatingData } from "@/slices/rating/entities";

export interface AddRatingRepository {
    addRating(rating: RatingData): Promise<RatingData | null>;
}
