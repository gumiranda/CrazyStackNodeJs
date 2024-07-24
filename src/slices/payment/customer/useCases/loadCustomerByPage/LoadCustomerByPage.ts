import { LoadCustomerByPageRepository } from "@/slices/payment/customer/repositories";
import { CustomerPaginated } from "@/slices/payment/customer/entities";
import { Query } from "@/application/types";

export type LoadCustomerByPage = (query: Query) => Promise<CustomerPaginated | null>;
export type LoadCustomerByPageSignature = (
  loadCustomerByPage: LoadCustomerByPageRepository
) => LoadCustomerByPage;
export const loadCustomerByPage: LoadCustomerByPageSignature =
  (loadCustomerByPageRepository: LoadCustomerByPageRepository) => async (query: Query) => {
    return loadCustomerByPageRepository.loadCustomerByPage(query);
  };
