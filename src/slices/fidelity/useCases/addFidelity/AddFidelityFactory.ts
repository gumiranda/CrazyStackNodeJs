import { MongoRepository } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { addFidelity, AddFidelity } from "@/slices/fidelity/useCases";

export const makeAddFidelityFactory = (): AddFidelity => {
  const repository = new FidelityRepository(new MongoRepository("fidelity"));
  return addFidelity(repository);
};
