import { MongoRepository } from "@/application/infra";
import { makePaymentAdapter } from "@/application/infra/payment/paymentAdapter";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import {
  loadCustomer,
  LoadCustomer,
  makeUpdateCustomerFactory,
} from "@/slices/payment/customer/useCases";

export const makeLoadCustomerFactory = (): LoadCustomer => {
  const repository = new CustomerRepository(new MongoRepository("customer"));
  return loadCustomer(repository, makePaymentAdapter(), makeUpdateCustomerFactory());
};
