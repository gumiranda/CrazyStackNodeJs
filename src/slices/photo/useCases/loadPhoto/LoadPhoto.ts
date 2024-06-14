import { LoadPhotoRepository } from "@/slices/photo/repositories";
import { PhotoData } from "@/slices/photo/entities";
import { Query } from "@/application/types";

export type LoadPhoto = (query: Query) => Promise<PhotoData | null>;
export type LoadPhotoSignature = (loadPhoto: LoadPhotoRepository) => LoadPhoto;
export const loadPhoto: LoadPhotoSignature =
    (loadPhotoRepository: LoadPhotoRepository) => async (query: Query) => {
        return loadPhotoRepository.loadPhoto(query);
    };
