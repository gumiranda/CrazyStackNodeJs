import { UpdateOwnerRepository } from "@/slices/owner/repositories";
import { OwnerData } from "@/slices/owner/entities";
import { Query } from "@/application/types";

export type UpdateOwner = (query: Query, data: OwnerData) => Promise<OwnerData | null>;
export type UpdateOwnerSignature = (updateOwner: UpdateOwnerRepository) => UpdateOwner;
export const updateOwner: UpdateOwnerSignature =
  (updateOwnerRepository: UpdateOwnerRepository) =>
  async (query: Query, data: OwnerData) => {
    return updateOwnerRepository.updateOwner(query, data);
  };
