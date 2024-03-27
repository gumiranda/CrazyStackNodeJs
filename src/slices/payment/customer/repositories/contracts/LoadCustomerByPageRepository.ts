import { Query } from "@/application/types";
import { CustomerPaginated } from "@/slices/payment/customer/entities";

export interface LoadCustomerByPageRepository {
  loadCustomerByPage(query: Query): Promise<CustomerPaginated | null>;
}
