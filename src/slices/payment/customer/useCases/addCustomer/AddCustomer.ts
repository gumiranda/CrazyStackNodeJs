import { AddCustomerRepository } from "@/slices/payment/customer/repositories";
import { CustomerEntity, CustomerData } from "@/slices/payment/customer/entities";
import { PaymentGateway } from "@/application/infra/contracts";

export type AddCustomer = (data: CustomerData) => Promise<CustomerEntity | null>;
export type AddCustomerSignature = (
  addCustomer: AddCustomerRepository,
  paymentProvider: PaymentGateway
) => AddCustomer;
export const addCustomer: AddCustomerSignature =
  (addCustomerRepository: AddCustomerRepository, paymentProvider: PaymentGateway) =>
  async (data: CustomerData) => {
    const response = await paymentProvider.createCustomer(data);
    if (!response?.customer) return null;
    return addCustomerRepository.addCustomer(
      new CustomerEntity({ ...data, ...response?.customer })
    );
  };
