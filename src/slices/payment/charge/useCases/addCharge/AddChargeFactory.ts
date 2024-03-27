import { MongoRepository } from "@/application/infra";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { addCharge, AddCharge } from "@/slices/payment/charge/useCases";

export const makeAddChargeFactory = (): AddCharge => {
  const repository = new ChargeRepository(new MongoRepository("charge"));
  return addCharge(repository, makePaymentAdapter());
};
