import { makeDatabaseInstance } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import { updateCustomer, UpdateCustomer } from "@/slices/payment/customer/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeUpdateCustomerFactory = (): UpdateCustomer => {
  const repository = new CustomerRepository(
    makeDatabaseInstance(whiteLabel.database, "customer")
  );
  return updateCustomer(repository);
};
