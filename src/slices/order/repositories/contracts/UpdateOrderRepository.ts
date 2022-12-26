import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";

export interface UpdateOrderRepository {
    updateOrder(query: Query, data: OrderData): Promise<OrderData | null>;
}
