import { Query } from "@/application/types";
import { PaymentGateway } from "@/application/infra/contracts/paymentGateway";
import { SubscriptionData } from "../../entities";
import { LoadSubscriptionRepository } from "../../repositories";

export type LoadSubscription = (query: Query) => Promise<SubscriptionData | null>;
export type LoadSubscriptionSignature = (
  loadSubscription: LoadSubscriptionRepository,
  paymentProvider: PaymentGateway
) => LoadSubscription;
export const loadSubscription: LoadSubscriptionSignature =
  (
    loadSubscriptionRepository: LoadSubscriptionRepository,
    paymentProvider: PaymentGateway
  ) =>
  async (query: Query) => {
    const { subscription } = await paymentProvider.getSubscription(
      query?.fields?.globalID
    );
    if (!subscription) return null;
    return loadSubscriptionRepository.loadSubscription(query);
  };
