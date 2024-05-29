import { makeDatabaseInstance } from "@/application/infra";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { updateCharge, UpdateCharge } from "@/slices/payment/charge/useCases";

export const makeUpdateChargeFactory = (): UpdateCharge => {
  const repository = new ChargeRepository(makeDatabaseInstance("mongodb", "charge"));
  return updateCharge(repository);
};
