import { MongoRepository } from "@/application/infra";
import { makeWooviAdapter } from "@/application/infra/payment/WooviAdapter";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { deleteCharge, DeleteCharge } from "@/slices/payment/charge/useCases";

export const makeDeleteChargeFactory = (): DeleteCharge => {
  const repository = new ChargeRepository(new MongoRepository("charge"));
  return deleteCharge(repository, makeWooviAdapter());
};
