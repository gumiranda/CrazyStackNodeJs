import { Query } from "@/application/types";
import { OwnerData } from "@/slices/owner/entities";

export interface DeleteOwnerRepository {
  deleteOwner(query: Query): Promise<OwnerData | null>;
}
