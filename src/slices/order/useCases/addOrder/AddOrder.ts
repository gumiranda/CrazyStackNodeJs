import { AddOrderRepository } from "@/slices/order/repositories";
import { OrderEntity, OrderData } from "@/slices/order/entities";

export type AddOrder = (data: OrderData) => Promise<OrderEntity | null>;
export type AddOrderSignature = (addOrder: AddOrderRepository) => AddOrder;
export const addOrder: AddOrderSignature =
    (addOrderRepository: AddOrderRepository) => (data: OrderData) => {
        return addOrderRepository.addOrder(new OrderEntity(data));
    };
