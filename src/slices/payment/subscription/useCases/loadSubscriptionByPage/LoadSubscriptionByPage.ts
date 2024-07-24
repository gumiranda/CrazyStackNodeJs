import { LoadSubscriptionByPageRepository } from "@/slices/payment/subscription/repositories";
import { SubscriptionPaginated } from "@/slices/payment/subscription/entities";
import { Query } from "@/application/types";

export type LoadSubscriptionByPage = (
  query: Query
) => Promise<SubscriptionPaginated | null>;
export type LoadSubscriptionByPageSignature = (
  loadSubscriptionByPage: LoadSubscriptionByPageRepository
) => LoadSubscriptionByPage;
export const loadSubscriptionByPage: LoadSubscriptionByPageSignature =
  (loadSubscriptionByPageRepository: LoadSubscriptionByPageRepository) =>
  async (query: Query) => {
    return loadSubscriptionByPageRepository.loadSubscriptionByPage(query);
  };
