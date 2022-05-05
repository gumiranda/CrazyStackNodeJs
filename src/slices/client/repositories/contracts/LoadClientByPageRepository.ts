import { Query } from "@/application/types";
import { ClientPaginated } from "@/slices/client/entities";

export interface LoadClientByPageRepository {
    loadClientByPage(query: Query): Promise<ClientPaginated | null>;
}
