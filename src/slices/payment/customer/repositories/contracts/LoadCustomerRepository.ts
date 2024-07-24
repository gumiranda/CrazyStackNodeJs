import { Query } from "@/application/types";
import { CustomerData } from "@/slices/payment/customer/entities";

export interface LoadCustomerRepository {
  loadCustomer(query: Query): Promise<CustomerData | null>;
}
