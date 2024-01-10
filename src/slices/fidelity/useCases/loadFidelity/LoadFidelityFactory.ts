import { MongoRepository } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { loadFidelity, LoadFidelity } from "@/slices/fidelity/useCases";

export const makeLoadFidelityFactory = (): LoadFidelity => {
  const repository = new FidelityRepository(new MongoRepository("fidelity"));
  return loadFidelity(repository);
};
