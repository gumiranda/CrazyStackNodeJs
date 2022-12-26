import { Query } from "@/application/types";
import { ClientData } from "@/slices/client/entities";

export interface UpdateClientRepository {
    updateClient(query: Query, data: ClientData): Promise<ClientData | null>;
    incrementAppointmentsTotal(query: Query): Promise<ClientData | null>;
}
