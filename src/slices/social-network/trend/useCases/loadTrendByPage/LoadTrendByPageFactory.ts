import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { TrendRepository } from "@/slices/social-network/trend/repositories";
import { loadTrendByPage, LoadTrendByPage } from "@/slices/social-network/trend/useCases";

export const makeLoadTrendByPageFactory = (): LoadTrendByPage => {
  const repository = new TrendRepository(
    makeDatabaseInstance(whiteLabel.database, "trend")
  );
  return loadTrendByPage(repository);
};
