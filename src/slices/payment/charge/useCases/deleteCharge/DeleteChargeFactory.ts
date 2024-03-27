import { MongoRepository } from "@/application/infra";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { deleteCharge, DeleteCharge } from "@/slices/payment/charge/useCases";

export const makeDeleteChargeFactory = (): DeleteCharge => {
  const repository = new ChargeRepository(new MongoRepository("charge"));
  return deleteCharge(repository, makePaymentAdapter());
};
