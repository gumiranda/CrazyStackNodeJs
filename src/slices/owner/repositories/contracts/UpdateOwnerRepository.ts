import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";

export interface UpdateOwnerRepository {
  updateOwner(query: Query, data: OwnerData): Promise<OwnerData | null>;
}
