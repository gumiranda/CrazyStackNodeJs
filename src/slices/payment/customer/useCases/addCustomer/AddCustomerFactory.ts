import { MongoRepository } from "@/application/infra";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { addCustomer, AddCustomer } from "@/slices/payment/customer/useCases";

export const makeAddCustomerFactory = (): AddCustomer => {
  const repository = new CustomerRepository(new MongoRepository("customer"));
  return addCustomer(repository, makePaymentAdapter("stripe"));
};
