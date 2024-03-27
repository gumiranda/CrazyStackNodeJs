import { AddChargeRepository } from "@/slices/payment/charge/repositories";
import { ChargeEntity, ChargeData } from "@/slices/payment/charge/entities";
import { PaymentGateway } from "@/application/infra/contracts";

export type AddCharge = (data: ChargeData) => Promise<ChargeEntity | null>;
export type AddChargeSignature = (
  addCharge: AddChargeRepository,
  paymentProvider: PaymentGateway
) => AddCharge;
export const addCharge: AddChargeSignature =
  (addChargeRepository: AddChargeRepository, paymentProvider: PaymentGateway) =>
  async (data: ChargeData) => {
    const response = await paymentProvider.createCharge(data);
    if (!response?.charge) return null;
    return addChargeRepository.addCharge(
      new ChargeEntity({ ...data, gatewayDetails: response?.charge, ...response?.charge })
    );
  };
