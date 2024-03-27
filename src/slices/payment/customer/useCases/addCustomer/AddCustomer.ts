import { AddCustomerRepository } from "@/slices/payment/customer/repositories";
import { CustomerEntity, CustomerData } from "@/slices/payment/customer/entities";

export type AddCustomer = (data: CustomerData) => Promise<CustomerEntity | null>;
export type AddCustomerSignature = (addCustomer: AddCustomerRepository) => AddCustomer;
export const addCustomer: AddCustomerSignature =
  (addCustomerRepository: AddCustomerRepository) => (data: CustomerData) => {
    return addCustomerRepository.addCustomer(new CustomerEntity(data));
  };
