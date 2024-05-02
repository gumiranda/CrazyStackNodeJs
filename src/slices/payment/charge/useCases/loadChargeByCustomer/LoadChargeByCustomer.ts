import { ChargePaginated } from "@/slices/payment/charge/entities";
import { Query } from "@/application/types";
import { PaymentGateway } from "@/application/infra/contracts";

export type LoadChargeByCustomer = (query: Query) => Promise<ChargePaginated | null>;
export type LoadChargeByCustomerSignature = (
  paymentProvider: PaymentGateway
) => LoadChargeByCustomer;
export const loadChargeByCustomer: LoadChargeByCustomerSignature =
  (paymentProvider: PaymentGateway) => async (query: Query) => {
    return paymentProvider.getChargeByCustomer(query?.fields?.correlationID);
  };
