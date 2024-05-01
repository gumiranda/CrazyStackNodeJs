import { AddSubscriptionRepository } from "@/slices/payment/subscription/repositories";
import {
  SubscriptionEntity,
  SubscriptionData,
} from "@/slices/payment/subscription/entities";
import { PaymentGateway } from "@/application/infra/contracts";
import { whiteLabel } from "@/application/infra/config/whiteLabel";

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
      const result = await paymentProvider.createSubscription({
        customer: customer ?? data.customer,
        value: Number(data.value),
        comment: data.comment,
        additionalInfo: data.additionalInfo,
        dayGenerateCharge: Number(data?.dayGenerateCharge ?? 5),
        chargeType: "DYNAMIC",
        dayDue: whiteLabel.paymentDaysDue,
        priceId: data?.priceId,
        pagarmeSubscription: data?.pagarmeSubscription,
      });
      const { subscription } = result || {};
      if (!subscription) return null;
      return addSubscriptionRepository.addSubscription(
        new SubscriptionEntity({
          ...data,
          ...subscription,
          gatewayDetails: subscription,
          globalID: subscription?.id ?? subscription?.globalID ?? data?.globalID,
        })
      );
    } catch (error) {
      return null;
    }
  };
