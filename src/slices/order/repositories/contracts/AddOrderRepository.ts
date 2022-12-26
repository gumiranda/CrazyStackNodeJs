import { OrderData } from "@/slices/order/entities";

export interface AddOrderRepository {
    addOrder(order: OrderData): Promise<OrderData | null>;
}
