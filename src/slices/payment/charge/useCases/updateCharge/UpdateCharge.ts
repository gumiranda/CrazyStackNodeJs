import { UpdateChargeRepository } from "@/slices/payment/charge/repositories";
import { ChargeData } from "@/slices/payment/charge/entities";
import { Query } from "@/application/types";

export type UpdateCharge = (query: Query, data: ChargeData) => Promise<ChargeData | null>;
export type UpdateChargeSignature = (updateCharge: UpdateChargeRepository) => UpdateCharge;
export const updateCharge: UpdateChargeSignature =
  (updateChargeRepository: UpdateChargeRepository) =>
  async (query: Query, data: ChargeData) => {
    return updateChargeRepository.updateCharge(query, data);
  };
