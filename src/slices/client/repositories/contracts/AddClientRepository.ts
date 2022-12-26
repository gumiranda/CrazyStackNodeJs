import { ClientData } from "@/slices/client/entities";

export interface AddClientRepository {
    addClient(client: ClientData): Promise<ClientData | null>;
}
