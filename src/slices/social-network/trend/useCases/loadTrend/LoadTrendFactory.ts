import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TrendRepository } from "@/slices/social-network/trend/repositories";
import { loadTrend, LoadTrend } from "@/slices/social-network/trend/useCases";

export const makeLoadTrendFactory = (): LoadTrend => {
  const repository = new TrendRepository(
    makeDatabaseInstance(whiteLabel.database, "trend")
  );
  return loadTrend(repository);
};
