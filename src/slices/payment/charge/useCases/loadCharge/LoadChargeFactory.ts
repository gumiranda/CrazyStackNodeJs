import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { ChargeRepository } from "@/slices/payment/charge/repositories";
import {
  loadCharge,
  LoadCharge,
  makeUpdateChargeFactory,
} from "@/slices/payment/charge/useCases";

export const makeLoadChargeFactory = (): LoadCharge => {
  const repository = new ChargeRepository(
    makeDatabaseInstance(whiteLabel.database, "charge")
  );
  return loadCharge(
    repository,
    makePaymentAdapter(whiteLabel.gatewayPix),
    makeUpdateChargeFactory()
  );
};
