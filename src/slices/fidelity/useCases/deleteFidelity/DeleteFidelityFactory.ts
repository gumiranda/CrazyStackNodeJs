import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { deleteFidelity, DeleteFidelity } from "@/slices/fidelity/useCases";

export const makeDeleteFidelityFactory = (): DeleteFidelity => {
  const repository = new FidelityRepository(makeDatabaseInstance("mongodb", "fidelity"));
  return deleteFidelity(repository);
};
