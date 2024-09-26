import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { updateFidelity, UpdateFidelity } from "@/slices/fidelity/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateFidelityFactory = (): UpdateFidelity => {
  const repository = new FidelityRepository(
    makeDatabaseInstance(whiteLabel.database, "fidelity")
  );
  return updateFidelity(repository);
};
