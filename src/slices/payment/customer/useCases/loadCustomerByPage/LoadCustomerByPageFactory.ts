import { makeDatabaseInstance } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import {
  loadCustomerByPage,
  LoadCustomerByPage,
} from "@/slices/payment/customer/useCases";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

export const makeLoadCustomerByPageFactory = (): LoadCustomerByPage => {
  const repository = new CustomerRepository(
    makeDatabaseInstance(whiteLabel.database, "customer")
  );
  return loadCustomerByPage(repository);
};
