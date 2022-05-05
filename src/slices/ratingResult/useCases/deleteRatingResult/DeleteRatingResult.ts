import { DeleteRatingResultRepository } from "@/slices/ratingResult/repositories";
import { RatingResultData } from "@/slices/ratingResult/entities";
import { Query } from "@/application/types";

export type DeleteRatingResult = (query: Query) => Promise<RatingResultData | null>;
export type DeleteRatingResultSignature = (
    deleteRatingResult: DeleteRatingResultRepository
) => DeleteRatingResult;
export const deleteRatingResult: DeleteRatingResultSignature =
    (deleteRatingResultRepository: DeleteRatingResultRepository) => (query: Query) => {
        return deleteRatingResultRepository.deleteRatingResult(query);
    };
