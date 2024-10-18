import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TrendRepository } from "@/slices/trend/repositories";
import { updateTrend, UpdateTrend } from "@/slices/trend/useCases";

export const makeUpdateTrendFactory = (): UpdateTrend => {
  const repository = new TrendRepository(makeDatabaseInstance(whiteLabel.database,"trend"));
  return updateTrend(repository);
};
