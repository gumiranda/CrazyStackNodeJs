import { makeDatabaseInstance } from "@/application/infra";
import { FidelityRepository } from "@/slices/fidelity/repositories";
import { deleteFidelity, DeleteFidelity } from "@/slices/fidelity/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteFidelityFactory = (): DeleteFidelity => {
  const repository = new FidelityRepository(
    makeDatabaseInstance(whiteLabel.database, "fidelity")
  );
  return deleteFidelity(repository);
};
