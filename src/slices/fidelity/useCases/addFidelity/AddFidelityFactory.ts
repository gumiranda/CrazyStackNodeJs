import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { addFidelity, AddFidelity } from "@/slices/fidelity/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeAddFidelityFactory = (): AddFidelity => {
  const repository = new FidelityRepository(
    makeDatabaseInstance(whiteLabel.database, "fidelity")
  );
  return addFidelity(repository);
};
