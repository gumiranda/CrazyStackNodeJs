import { Query } from "@/application/types";
import { OrderPaginated } from "@/slices/order/entities";

export interface LoadOrderByPageRepository {
    loadOrderByPage(query: Query): Promise<OrderPaginated | null>;
}
