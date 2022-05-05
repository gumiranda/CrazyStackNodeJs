import { AddClientRepository } from "@/slices/client/repositories";
import { ClientEntity, ClientData } from "@/slices/client/entities";

export type AddClient = (data: ClientData) => Promise<ClientEntity | null>;
export type AddClientSignature = (addClient: AddClientRepository) => AddClient;
export const addClient: AddClientSignature =
    (addClientRepository: AddClientRepository) => (data: ClientData) => {
        return addClientRepository.addClient(new ClientEntity(data));
    };
