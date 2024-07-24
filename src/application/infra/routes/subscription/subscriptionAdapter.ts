import { adaptRoute } from "@/application/adapters";
import {
  makeAddSubscriptionController,
  makeLoadSubscriptionController,
  makeDeleteSubscriptionController,
  makeUpdateSubscriptionController,
  makeLoadSubscriptionByPageController,
} from "@/slices/payment/subscription/controllers";

export const addSubscriptionAdapter = () => adaptRoute(makeAddSubscriptionController());
export const loadSubscriptionAdapter = () => adaptRoute(makeLoadSubscriptionController());
export const loadSubscriptionByPageAdapter = () =>
  adaptRoute(makeLoadSubscriptionByPageController());
export const deleteSubscriptionAdapter = () =>
  adaptRoute(makeDeleteSubscriptionController());
export const updateSubscriptionAdapter = () =>
  adaptRoute(makeUpdateSubscriptionController());
