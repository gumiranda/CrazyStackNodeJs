import { Query } from "@/application/types";
import { CustomerData } from "@/slices/payment/customer/entities";

export interface UpdateCustomerRepository {
  updateCustomer(query: Query, data: CustomerData): Promise<CustomerData | null>;
}
