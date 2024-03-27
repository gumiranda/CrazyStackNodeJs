import { DeleteChargeRepository } from "@/slices/payment/charge/repositories";
import { ChargeData } from "@/slices/payment/charge/entities";
import { Query } from "@/application/types";

export type DeleteCharge = (query: Query) => Promise<ChargeData | null>;
export type DeleteChargeSignature = (deleteCharge: DeleteChargeRepository) => DeleteCharge;
export const deleteCharge: DeleteChargeSignature =
  (deleteChargeRepository: DeleteChargeRepository) => (query: Query) => {
    return deleteChargeRepository.deleteCharge(query);
  };
