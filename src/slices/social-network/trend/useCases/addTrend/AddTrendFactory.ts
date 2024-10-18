import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TrendRepository } from "@/slices/trend/repositories";
import { addTrend, AddTrend } from "@/slices/trend/useCases";

export const makeAddTrendFactory = (): AddTrend => {
  const repository = new TrendRepository(makeDatabaseInstance(whiteLabel.database,"trend"));
  return addTrend(repository);
};
