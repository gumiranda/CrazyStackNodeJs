import { Query } from "@/application/types";
import type { LoadPlace } from "@/slices/place/useCases";
import type { LoadOwnerByPageRepository } from "../../repositories";

export type LoadOwnerByPage = (query: Query) => Promise<any | null>;
export type LoadOwnerByPageSignature = (
  loadOwnerByPage: LoadOwnerByPageRepository,
  loadPlace: LoadPlace
) => LoadOwnerByPage;

export const loadOwnerByPage: LoadOwnerByPageSignature =
  (loadOwnerByPageRepository, loadPlace) => async (query: Query) => {
    const ownersPaginated = await loadOwnerByPageRepository.loadOwnerByPage(query);
    if (!ownersPaginated?.owners) {
      return ownersPaginated;
    }
    const enrichedData = await Promise.all(
      ownersPaginated.owners.map(async (owner) => {
        const place = await loadPlace({ fields: { ownerId: owner?._id }, options: {} });
        return { ...owner, place };
      })
    );
    return { ...ownersPaginated, owners: enrichedData };
  };
