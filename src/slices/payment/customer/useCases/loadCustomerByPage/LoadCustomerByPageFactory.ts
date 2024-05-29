import { makeDatabaseInstance } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import {
  loadCustomerByPage,
  LoadCustomerByPage,
} from "@/slices/payment/customer/useCases";

export const makeLoadCustomerByPageFactory = (): LoadCustomerByPage => {
  const repository = new CustomerRepository(makeDatabaseInstance("mongodb", "customer"));
  return loadCustomerByPage(repository);
};
