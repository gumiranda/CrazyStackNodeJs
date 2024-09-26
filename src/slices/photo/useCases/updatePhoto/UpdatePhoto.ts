import { UpdatePhotoRepository } from "@/slices/photo/repositories";
import { PhotoData } from "@/slices/photo/entities";
import { Query } from "@/application/types";

export type UpdatePhoto = (
    query: Query,
    data: PhotoData
) => Promise<PhotoData | null>;
export type UpdatePhotoSignature = (
    updatePhoto: UpdatePhotoRepository
) => UpdatePhoto;
export const updatePhoto: UpdatePhotoSignature =
    (updatePhotoRepository: UpdatePhotoRepository) =>
    async (query: Query, data: PhotoData) => {
        return updatePhotoRepository.updatePhoto(query, data);
    };
