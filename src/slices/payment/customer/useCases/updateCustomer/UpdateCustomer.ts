import { UpdateCustomerRepository } from "@/slices/payment/customer/repositories";
import { CustomerData } from "@/slices/payment/customer/entities";
import { Query } from "@/application/types";

export type UpdateCustomer = (
  query: Query,
  data: CustomerData
) => Promise<CustomerData | null>;
export type UpdateCustomerSignature = (
  updateCustomer: UpdateCustomerRepository
) => UpdateCustomer;
export const updateCustomer: UpdateCustomerSignature =
  (updateCustomerRepository: UpdateCustomerRepository) =>
  async (query: Query, data: CustomerData) => {
    return updateCustomerRepository.updateCustomer(query, data);
  };
