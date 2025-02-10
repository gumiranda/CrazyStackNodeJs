import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TrendRepository } from "@/slices/social-network/trend/repositories";
import { removeTrend, RemoveTrend } from "@/slices/social-network/trend/useCases";

export const makeRemoveTrendFactory = (): RemoveTrend => {
  const repository = new TrendRepository(
    makeDatabaseInstance(whiteLabel.database, "trend")
  );
  return removeTrend(repository);
};
