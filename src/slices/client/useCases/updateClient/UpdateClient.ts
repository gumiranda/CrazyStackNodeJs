import { UpdateClientRepository } from "@/slices/client/repositories";
import { ClientData } from "@/slices/client/entities";
import { Query } from "@/application/types";

export type UpdateClient = (query: Query, data: ClientData) => Promise<ClientData | null>;
export type UpdateClientSignature = (updateClient: UpdateClientRepository) => UpdateClient;
export const updateClient: UpdateClientSignature =
  (updateClientRepository: UpdateClientRepository) =>
  async (query: Query, data: ClientData) => {
    return updateClientRepository.updateClient(query, data);
  };
