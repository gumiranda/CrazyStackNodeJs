import { Query } from "@/application/types";
import { ChargePaginated } from "@/slices/payment/charge/entities";

export interface LoadChargeByPageRepository {
  loadChargeByPage(query: Query): Promise<ChargePaginated | null>;
}
