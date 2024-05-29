import { makeDatabaseInstance } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { updateCustomer, UpdateCustomer } from "@/slices/payment/customer/useCases";

export const makeUpdateCustomerFactory = (): UpdateCustomer => {
  const repository = new CustomerRepository(makeDatabaseInstance("mongodb", "customer"));
  return updateCustomer(repository);
};
