import { AddChargeRepository } from "@/slices/payment/charge/repositories";
import { ChargeEntity, ChargeData } from "@/slices/payment/charge/entities";

export type AddCharge = (data: ChargeData) => Promise<ChargeEntity | null>;
export type AddChargeSignature = (addCharge: AddChargeRepository) => AddCharge;
export const addCharge: AddChargeSignature =
  (addChargeRepository: AddChargeRepository) => (data: ChargeData) => {
    return addChargeRepository.addCharge(new ChargeEntity(data));
  };
