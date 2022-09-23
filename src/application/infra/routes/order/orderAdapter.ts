import { adaptRoute } from "@/application/adapters";
import {
  makeAddOrderController,
  makeLoadOrderController,
  makeDeleteOrderController,
  makeUpdateOrderController,
  makeLoadOrderByPageController,
} from "@/slices/order/controllers";

export const addOrderAdapter = () => adaptRoute(makeAddOrderController());
export const loadOrderAdapter = () => adaptRoute(makeLoadOrderController());
export const loadOrderByPageAdapter = () =>
  adaptRoute(makeLoadOrderByPageController());
export const deleteOrderAdapter = () => adaptRoute(makeDeleteOrderController());
export const updateOrderAdapter = () => adaptRoute(makeUpdateOrderController());
