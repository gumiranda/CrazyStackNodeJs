import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { addCharge, AddCharge } from "@/slices/payment/charge/useCases";

export const makeAddChargeFactory = (): AddCharge => {
  const repository = new ChargeRepository(makeDatabaseInstance("mongodb", "charge"));
  return addCharge(repository, makePaymentAdapter(whiteLabel.gatewayPix));
};
