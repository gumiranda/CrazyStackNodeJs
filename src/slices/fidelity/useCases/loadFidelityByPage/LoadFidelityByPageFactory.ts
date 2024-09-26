import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { loadFidelityByPage, LoadFidelityByPage } from "@/slices/fidelity/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadFidelityByPageFactory = (): LoadFidelityByPage => {
  const repository = new FidelityRepository(
    makeDatabaseInstance(whiteLabel.database, "fidelity")
  );
  return loadFidelityByPage(repository);
};
