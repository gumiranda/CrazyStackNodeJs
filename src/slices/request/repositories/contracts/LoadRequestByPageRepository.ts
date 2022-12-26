import { Query } from "@/application/types";
import { RequestPaginated } from "@/slices/request/entities";

export interface LoadRequestByPageRepository {
    loadRequestByPage(query: Query): Promise<RequestPaginated | null>;
}
