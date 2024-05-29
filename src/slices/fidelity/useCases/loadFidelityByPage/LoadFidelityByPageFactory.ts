import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { loadFidelityByPage, LoadFidelityByPage } from "@/slices/fidelity/useCases";

export const makeLoadFidelityByPageFactory = (): LoadFidelityByPage => {
  const repository = new FidelityRepository(makeDatabaseInstance("mongodb", "fidelity"));
  return loadFidelityByPage(repository);
};
