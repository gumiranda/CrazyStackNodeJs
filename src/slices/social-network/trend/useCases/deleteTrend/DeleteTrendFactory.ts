import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TrendRepository } from "@/slices/social-network/trend/repositories";
import { deleteTrend, DeleteTrend } from "@/slices/social-network/trend/useCases";

export const makeDeleteTrendFactory = (): DeleteTrend => {
  const repository = new TrendRepository(
    makeDatabaseInstance(whiteLabel.database, "trend")
  );
  return deleteTrend(repository);
};
