import { LoadCustomerRepository } from "@/slices/payment/customer/repositories";
import { CustomerData } from "@/slices/payment/customer/entities";
import { Query } from "@/application/types";

export type LoadCustomer = (query: Query) => Promise<CustomerData | null>;
export type LoadCustomerSignature = (loadCustomer: LoadCustomerRepository) => LoadCustomer;
export const loadCustomer: LoadCustomerSignature =
  (loadCustomerRepository: LoadCustomerRepository) => async (query: Query) => {
    return loadCustomerRepository.loadCustomer(query);
  };
