import { TrendEntity, TrendData } from "@/slices/social-network/trend/entities";
import type { TrendRepository } from "../../repositories";

export type RemoveTrend = (data: TrendData) => Promise<TrendEntity | null>;
export type RemoveTrendSignature = (removeTrend: TrendRepository) => RemoveTrend;
export const removeTrend: RemoveTrendSignature =
  (upsertTrendRepository: TrendRepository) => async (data: TrendData) => {
    const queryHashtag = { fields: { hashtag: data.hashtag } };
    const currentHashtag = await upsertTrendRepository.loadTrend(queryHashtag);
    if (currentHashtag?.counter && currentHashtag.counter > 1) {
      return upsertTrendRepository.updateTrend(
        { fields: { _id: currentHashtag?._id } },
        {
          counter: currentHashtag.counter - 1,
          hashtag: currentHashtag.hashtag,
        }
      );
    }
    return upsertTrendRepository.deleteTrend(queryHashtag);
  };
