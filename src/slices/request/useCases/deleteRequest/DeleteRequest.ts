import { DeleteRequestRepository } from "@/slices/request/repositories";
import { RequestData } from "@/slices/request/entities";
import { Query } from "@/application/types";

export type DeleteRequest = (query: Query) => Promise<RequestData | null>;
export type DeleteRequestSignature = (
    deleteRequest: DeleteRequestRepository
) => DeleteRequest;
export const deleteRequest: DeleteRequestSignature =
    (deleteRequestRepository: DeleteRequestRepository) => (query: Query) => {
        return deleteRequestRepository.deleteRequest(query);
    };
