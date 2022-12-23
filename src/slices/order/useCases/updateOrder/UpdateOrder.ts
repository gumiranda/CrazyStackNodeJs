import { UpdateOrderRepository } from "@/slices/order/repositories";
import { OrderData } from "@/slices/order/entities";
import { Query } from "@/application/types";

export type UpdateOrder = (query: Query, data: OrderData) => Promise<OrderData | null>;
export type UpdateOrderSignature = (updateOrder: UpdateOrderRepository) => UpdateOrder;
export const updateOrder: UpdateOrderSignature =
  (updateOrderRepository: UpdateOrderRepository) =>
  async (query: Query, data: OrderData) => {
    return updateOrderRepository.updateOrder(query, data);
  };
