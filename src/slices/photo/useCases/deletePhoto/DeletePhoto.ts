import { DeletePhotoRepository } from "@/slices/photo/repositories";
import { PhotoData } from "@/slices/photo/entities";
import { Query } from "@/application/types";

export type DeletePhoto = (query: Query) => Promise<PhotoData | null>;
export type DeletePhotoSignature = (
    deletePhoto: DeletePhotoRepository
) => DeletePhoto;
export const deletePhoto: DeletePhotoSignature =
    (deletePhotoRepository: DeletePhotoRepository) => (query: Query) => {
        return deletePhotoRepository.deletePhoto(query);
    };
