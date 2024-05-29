import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { loadFidelity, LoadFidelity } from "@/slices/fidelity/useCases";

export const makeLoadFidelityFactory = (): LoadFidelity => {
  const repository = new FidelityRepository(makeDatabaseInstance("mongodb", "fidelity"));
  return loadFidelity(repository);
};
