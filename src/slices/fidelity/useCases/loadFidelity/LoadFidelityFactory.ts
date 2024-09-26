import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { loadFidelity, LoadFidelity } from "@/slices/fidelity/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadFidelityFactory = (): LoadFidelity => {
  const repository = new FidelityRepository(
    makeDatabaseInstance(whiteLabel.database, "fidelity")
  );
  return loadFidelity(repository);
};
