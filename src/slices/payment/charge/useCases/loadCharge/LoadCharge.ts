import { LoadChargeRepository } from "@/slices/payment/charge/repositories";
import { ChargeData } from "@/slices/payment/charge/entities";
import { Query } from "@/application/types";
import { PaymentGateway } from "@/application/infra/contracts";
import { UpdateCharge } from "../updateCharge";

export type LoadCharge = (query: Query) => Promise<ChargeData | null>;
export type LoadChargeSignature = (
  loadCharge: LoadChargeRepository,
  paymentProvider: PaymentGateway,
  updateCharge: UpdateCharge
) => LoadCharge;
export const loadCharge: LoadChargeSignature =
  (
    loadChargeRepository: LoadChargeRepository,
    paymentProvider: PaymentGateway,
    updateCharge: UpdateCharge
  ) =>
  async (query: Query) => {
    const response = await paymentProvider.getCharge(query?.fields?.correlationID);
    if (!response?.charge) return null;
    await updateCharge(query, { ...response.charge });
    return loadChargeRepository.loadCharge(query);
  };
