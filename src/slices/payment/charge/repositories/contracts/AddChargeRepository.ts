import { ChargeData } from "@/slices/payment/charge/entities";

export interface AddChargeRepository {
  addCharge(charge: ChargeData): Promise<ChargeData | null>;
}
