import { MongoRepository } from "@/application/infra";
import { CustomerRepository } from "@/slices/payment/customer/repositories";
import {
  loadCustomerByPage,
  LoadCustomerByPage,
} from "@/slices/payment/customer/useCases";

export const makeLoadCustomerByPageFactory = (): LoadCustomerByPage => {
  const repository = new CustomerRepository(new MongoRepository("customer"));
  return loadCustomerByPage(repository);
};
