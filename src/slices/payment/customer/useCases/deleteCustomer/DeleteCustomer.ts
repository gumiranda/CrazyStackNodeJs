import { DeleteCustomerRepository } from "@/slices/payment/customer/repositories";
import { CustomerData } from "@/slices/payment/customer/entities";
import { Query } from "@/application/types";

export type DeleteCustomer = (query: Query) => Promise<CustomerData | null>;
export type DeleteCustomerSignature = (
  deleteCustomer: DeleteCustomerRepository
) => DeleteCustomer;
export const deleteCustomer: DeleteCustomerSignature =
  (deleteCustomerRepository: DeleteCustomerRepository) => (query: Query) => {
    return deleteCustomerRepository.deleteCustomer(query);
  };
