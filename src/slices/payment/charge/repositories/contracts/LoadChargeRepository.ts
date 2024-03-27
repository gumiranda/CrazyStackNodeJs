import { Query } from "@/application/types";
import { ChargeData } from "@/slices/payment/charge/entities";

export interface LoadChargeRepository {
  loadCharge(query: Query): Promise<ChargeData | null>;
}
