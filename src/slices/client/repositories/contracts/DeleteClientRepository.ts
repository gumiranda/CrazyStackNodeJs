import { Query } from "@/application/types";
import { ClientData } from "@/slices/client/entities";

export interface DeleteClientRepository {
    deleteClient(query: Query): Promise<ClientData | null>;
}
