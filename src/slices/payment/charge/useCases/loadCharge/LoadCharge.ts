import { LoadChargeRepository } from "@/slices/payment/charge/repositories";
import { ChargeData } from "@/slices/payment/charge/entities";
import { Query } from "@/application/types";

export type LoadCharge = (query: Query) => Promise<ChargeData | null>;
export type LoadChargeSignature = (loadCharge: LoadChargeRepository) => LoadCharge;
export const loadCharge: LoadChargeSignature =
  (loadChargeRepository: LoadChargeRepository) => async (query: Query) => {
    return loadChargeRepository.loadCharge(query);
  };
