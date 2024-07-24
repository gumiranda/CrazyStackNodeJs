import { Query } from "@/application/types";
import { ChargeData } from "@/slices/payment/charge/entities";

export interface DeleteChargeRepository {
  deleteCharge(query: Query): Promise<ChargeData | null>;
}
