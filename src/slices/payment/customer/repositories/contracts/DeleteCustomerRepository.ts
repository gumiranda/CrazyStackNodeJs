import { Query } from "@/application/types";
import { CustomerData } from "@/slices/payment/customer/entities";

export interface DeleteCustomerRepository {
  deleteCustomer(query: Query): Promise<CustomerData | null>;
}
