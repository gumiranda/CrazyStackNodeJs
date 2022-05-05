import { Query } from "@/application/types";
import { OrderData } from "@/slices/order/entities";

export interface DeleteOrderRepository {
    deleteOrder(query: Query): Promise<OrderData | null>;
}
