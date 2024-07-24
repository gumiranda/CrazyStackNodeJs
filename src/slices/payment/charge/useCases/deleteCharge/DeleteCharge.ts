import { DeleteChargeRepository } from "@/slices/payment/charge/repositories";
import { ChargeData } from "@/slices/payment/charge/entities";
import { Query } from "@/application/types";
import { PaymentGateway } from "@/application/infra/contracts";

export type DeleteCharge = (query: Query) => Promise<ChargeData | null>;
export type DeleteChargeSignature = (
  deleteCharge: DeleteChargeRepository,
  paymentProvider: PaymentGateway
) => DeleteCharge;
export const deleteCharge: DeleteChargeSignature =
  (deleteChargeRepository: DeleteChargeRepository, paymentProvider: PaymentGateway) =>
  async (query: Query) => {
    const response = await paymentProvider.deleteCharge(query?.fields?.correlationID);
    if (response?.status !== "OK") return null;
    return deleteChargeRepository.deleteCharge(query);
  };
