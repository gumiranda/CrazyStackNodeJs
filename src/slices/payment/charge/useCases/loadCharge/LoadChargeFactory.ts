import { MongoRepository } from "@/application/infra";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { loadCharge, LoadCharge } from "@/slices/payment/charge/useCases";

export const makeLoadChargeFactory = (): LoadCharge => {
  const repository = new ChargeRepository(new MongoRepository("charge"));
  return loadCharge(repository);
};
