import { makeDatabaseInstance } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { deleteCustomer, DeleteCustomer } from "@/slices/payment/customer/useCases";

export const makeDeleteCustomerFactory = (): DeleteCustomer => {
  const repository = new CustomerRepository(makeDatabaseInstance("mongodb", "customer"));
  return deleteCustomer(repository);
};
