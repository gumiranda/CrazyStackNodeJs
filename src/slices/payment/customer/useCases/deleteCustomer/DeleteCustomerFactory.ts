import { makeDatabaseInstance } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { deleteCustomer, DeleteCustomer } from "@/slices/payment/customer/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeDeleteCustomerFactory = (): DeleteCustomer => {
  const repository = new CustomerRepository(
    makeDatabaseInstance(whiteLabel.database, "customer")
  );
  return deleteCustomer(repository);
};
