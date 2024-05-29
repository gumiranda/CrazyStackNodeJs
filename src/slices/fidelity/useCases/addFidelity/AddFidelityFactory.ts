import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { addFidelity, AddFidelity } from "@/slices/fidelity/useCases";

export const makeAddFidelityFactory = (): AddFidelity => {
  const repository = new FidelityRepository(makeDatabaseInstance("mongodb", "fidelity"));
  return addFidelity(repository);
};
