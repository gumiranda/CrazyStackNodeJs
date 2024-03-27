import { AddSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  SubscriptionEntity,
  SubscriptionData,
} from "@/slices/payment/subscription/entities";
import { PaymentGateway } from "@/application/infra/contracts";

export type AddSubscription = (
  data: SubscriptionData
) => Promise<SubscriptionEntity | null>;
export type AddSubscriptionSignature = (
  addSubscription: AddSubscriptionRepository,
  paymentProvider: PaymentGateway
) => AddSubscription;
export const addSubscription: AddSubscriptionSignature =
  (
    addSubscriptionRepository: AddSubscriptionRepository,
    paymentProvider: PaymentGateway
  ) =>
  async (data: SubscriptionData) => {
    try {
      const { customer } = await paymentProvider.createCustomer({ ...data.customer });
      const { subscription } = await paymentProvider.createSubscription({
        customer: customer ?? data.customer,
        value: Number(data.value),
        comment: data.comment,
        additionalInfo: data.additionalInfo,
        dayGenerateCharge: data.dayGenerateCharge,
        chargeType: "DYNAMIC",
        dayDue: 7,
      });
      if (!subscription) return null;
      return addSubscriptionRepository.addSubscription(
        new SubscriptionEntity({
          ...data,
          ...subscription,
          gatewayDetails: subscription,
        })
      );
    } catch (error) {
      return null;
    }
  };
