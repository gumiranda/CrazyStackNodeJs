import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { updateFidelity, UpdateFidelity } from "@/slices/fidelity/useCases";

export const makeUpdateFidelityFactory = (): UpdateFidelity => {
  const repository = new FidelityRepository(makeDatabaseInstance("mongodb", "fidelity"));
  return updateFidelity(repository);
};
