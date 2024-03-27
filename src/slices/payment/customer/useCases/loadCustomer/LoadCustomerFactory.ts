import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { loadCustomer, LoadCustomer } from "@/slices/payment/customer/useCases";

export const makeLoadCustomerFactory = (): LoadCustomer => {
  const repository = new CustomerRepository(new MongoRepository("customer"));
  return loadCustomer(repository);
};
