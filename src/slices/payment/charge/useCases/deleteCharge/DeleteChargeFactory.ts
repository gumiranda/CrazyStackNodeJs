import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import { deleteCharge, DeleteCharge } from "@/slices/payment/charge/useCases";

export const makeDeleteChargeFactory = (): DeleteCharge => {
  const repository = new ChargeRepository(
    makeDatabaseInstance(whiteLabel.database, "charge")
  );
  return deleteCharge(repository, makePaymentAdapter(whiteLabel.gatewayPix));
};
