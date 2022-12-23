import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";

export interface LoadOwnerRepository {
  loadOwner(query: Query): Promise<OwnerData | null>;
}
