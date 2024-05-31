import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { addCustomer, AddCustomer } from "@/slices/payment/customer/useCases";

export const makeAddCustomerFactory = (): AddCustomer => {
  const repository = new CustomerRepository(
    makeDatabaseInstance(whiteLabel.database, "customer")
  );
  return addCustomer(repository, makePaymentAdapter(whiteLabel.gatewayPix));
};
