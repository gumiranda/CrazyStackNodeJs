import { LoadPlaceRepository } from "@/slices/place/repositories";
import { PlaceData } from "@/slices/place/entities";
import { Query } from "@/application/types";
import { LoadPhoto } from "@/slices/photo/useCases";
import { isValidUUID } from "@/application/helpers";

export type LoadPlace = (query: Query) => Promise<PlaceData | null>;
export type LoadPlaceSignature = (
  loadPlace: LoadPlaceRepository,
  loadPhoto: LoadPhoto
) => LoadPlace;

export const loadPlace: LoadPlaceSignature =
  (loadPlaceRepository: LoadPlaceRepository, loadPhoto: LoadPhoto) =>
  async (query: Query) => {
    const place = await loadPlaceRepository.loadPlace(query);
    if (!place) {
      return null;
    }
    const photoPromises: Array<Promise<{ key: string; url?: string }>> = [];
    if (place.profilephoto && isValidUUID(place.profilephoto)) {
      photoPromises.push(
        loadPhoto({ fields: { _id: place.profilephoto } }).then((photo) => ({
          key: "profilephoto",
          url: photo?.url,
        }))
      );
    }
    if (place.cover && isValidUUID(place.cover)) {
      photoPromises.push(
        loadPhoto({ fields: { _id: place.cover } }).then((photo) => ({
          key: "cover",
          url: photo?.url,
        }))
      );
    }
    const photoResults = await Promise.all(photoPromises);
    const updates = photoResults.reduce<Record<string, string | undefined>>(
      (acc, result) => {
        acc[result.key] = result.url;
        return acc;
      },
      {}
    );
    return { ...place, ...updates };
  };
