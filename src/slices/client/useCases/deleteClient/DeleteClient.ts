import { DeleteClientRepository } from "@/slices/client/repositories";
import { ClientData } from "@/slices/client/entities";
import { Query } from "@/application/types";

export type DeleteClient = (query: Query) => Promise<ClientData | null>;
export type DeleteClientSignature = (deleteClient: DeleteClientRepository) => DeleteClient;
export const deleteClient: DeleteClientSignature =
  (deleteClientRepository: DeleteClientRepository) => (query: Query) => {
    return deleteClientRepository.deleteClient(query);
  };
