import { OwnerData } from "@/slices/owner/entities";

export interface AddOwnerRepository {
    addOwner(owner: OwnerData): Promise<OwnerData | null>;
}
