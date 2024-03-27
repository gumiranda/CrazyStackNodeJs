import { LoadCustomerRepository } from "@/slices/payment/customer/repositories";
import { CustomerData } from "@/slices/payment/customer/entities";
import { Query } from "@/application/types";
import { PaymentGateway } from "@/application/infra/contracts";
import { UpdateCustomer } from "../updateCustomer";

export type LoadCustomer = (query: Query) => Promise<CustomerData | null>;
export type LoadCustomerSignature = (
  loadCustomer: LoadCustomerRepository,
  paymentProvider: PaymentGateway,
  updateCustomer: UpdateCustomer
) => LoadCustomer;
export const loadCustomer: LoadCustomerSignature =
  (
    loadCustomerRepository: LoadCustomerRepository,
    paymentProvider: PaymentGateway,
    updateCustomer: UpdateCustomer
  ) =>
  async (query: Query) => {
    const response = await paymentProvider.getCustomer(query?.fields?.correlationID);
    if (!response?.customer) return null;
    await updateCustomer(query, { ...response.customer });
    return loadCustomerRepository.loadCustomer(query);
  };
