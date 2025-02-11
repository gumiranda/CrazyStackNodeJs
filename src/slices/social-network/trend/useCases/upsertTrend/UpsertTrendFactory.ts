import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TrendRepository } from "@/slices/social-network/trend/repositories";
import { upsertTrend, UpsertTrend } from "@/slices/social-network/trend/useCases";

export const makeUpsertTrendFactory = (): UpsertTrend => {
  const repository = new TrendRepository(
    makeDatabaseInstance(whiteLabel.database, "trend")
  );
  return upsertTrend(repository);
};
