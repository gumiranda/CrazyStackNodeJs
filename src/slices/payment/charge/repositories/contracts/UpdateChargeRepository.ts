import { Query } from "@/application/types";
import { ChargeData } from "@/slices/payment/charge/entities";

export interface UpdateChargeRepository {
  updateCharge(query: Query, data: ChargeData): Promise<ChargeData | null>;
}
