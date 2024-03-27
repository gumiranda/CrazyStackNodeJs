import { LoadChargeByPageRepository } from "@/slices/payment/charge/repositories";
import { ChargePaginated } from "@/slices/payment/charge/entities";
import { Query } from "@/application/types";

export type LoadChargeByPage = (query: Query) => Promise<ChargePaginated | null>;
export type LoadChargeByPageSignature = (
  loadChargeByPage: LoadChargeByPageRepository
) => LoadChargeByPage;
export const loadChargeByPage: LoadChargeByPageSignature =
  (loadChargeByPageRepository: LoadChargeByPageRepository) => async (query: Query) => {
    return loadChargeByPageRepository.loadChargeByPage(query);
  };
