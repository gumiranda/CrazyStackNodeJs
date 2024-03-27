import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { deleteCustomer, DeleteCustomer } from "@/slices/payment/customer/useCases";

export const makeDeleteCustomerFactory = (): DeleteCustomer => {
  const repository = new CustomerRepository(new MongoRepository("customer"));
  return deleteCustomer(repository);
};
