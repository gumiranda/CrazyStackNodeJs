import { Query } from "@/application/types";
import { ClientData } from "@/slices/client/entities";

export interface LoadClientRepository {
    loadClient(query: Query): Promise<ClientData | null>;
}
