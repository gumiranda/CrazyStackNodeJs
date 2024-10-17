import { TrendEntity, TrendData } from "@/slices/social-network/trend/entities";
import type { TrendRepository } from "../../repositories";

export type UpsertTrend = (data: TrendData) => Promise<TrendEntity | null>;
export type UpsertTrendSignature = (upsertTrend: TrendRepository) => UpsertTrend;
export const upsertTrend: UpsertTrendSignature =
  (upsertTrendRepository: TrendRepository) => async (data: TrendData) => {
    const queryHashtag = { fields: { hashtag: data.hashtag } };
    const currentHashtag = await upsertTrendRepository.loadTrend(queryHashtag);
    if (currentHashtag?.counter) {
      return upsertTrendRepository.updateTrend(queryHashtag, {
        counter: currentHashtag.counter + 1,
        hashtag: currentHashtag.hashtag,
      });
    }
    return upsertTrendRepository.addTrend(new TrendEntity(data));
  };
