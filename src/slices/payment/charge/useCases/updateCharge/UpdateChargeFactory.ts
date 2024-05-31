import { makeDatabaseInstance } from "@/application/infra";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { updateCharge, UpdateCharge } from "@/slices/payment/charge/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateChargeFactory = (): UpdateCharge => {
  const repository = new ChargeRepository(
    makeDatabaseInstance(whiteLabel.database, "charge")
  );
  return updateCharge(repository);
};
