import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import {
  loadCustomer,
  LoadCustomer,
  makeUpdateCustomerFactory,
} from "@/slices/payment/customer/useCases";

export const makeLoadCustomerFactory = (): LoadCustomer => {
  const repository = new CustomerRepository(makeDatabaseInstance("mongodb", "customer"));
  return loadCustomer(
    repository,
    makePaymentAdapter(whiteLabel.gatewayPix),
    makeUpdateCustomerFactory()
  );
};
