import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { loadChargeByCustomer, LoadChargeByCustomer } from "./LoadChargeByCustomer";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadChargeByCustomerFactory = (): LoadChargeByCustomer => {
  return loadChargeByCustomer(makePaymentAdapter(whiteLabel.gatewayPix));
};
