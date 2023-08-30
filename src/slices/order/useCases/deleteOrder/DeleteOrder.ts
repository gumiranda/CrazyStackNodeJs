import { DeleteOrderRepository } from "@/slices/order/repositories";
import { OrderData } from "@/slices/order/entities";
import { Query } from "@/application/types";

export type DeleteOrder = (query: Query) => Promise<OrderData | null>;
export type DeleteOrderSignature = (deleteOrder: DeleteOrderRepository) => DeleteOrder;
export const deleteOrder: DeleteOrderSignature =
  (deleteOrderRepository: DeleteOrderRepository) => (query: Query) => {
    return deleteOrderRepository.deleteOrder(query);
  };
