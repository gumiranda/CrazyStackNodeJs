import { CustomerData } from "@/slices/payment/customer/entities";

export interface AddCustomerRepository {
  addCustomer(customer: CustomerData): Promise<CustomerData | null>;
}
