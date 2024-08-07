import { MongoRepository } from "@/application/infra";
import { makeWooviAdapter } from "@/application/infra/payment/WooviAdapter";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { addCustomer, AddCustomer } from "@/slices/payment/customer/useCases";

export const makeAddCustomerFactory = (): AddCustomer => {
  const repository = new CustomerRepository(new MongoRepository("customer"));
  return addCustomer(repository, makeWooviAdapter());
};
