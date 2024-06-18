import { AddPhotoRepository } from "@/slices/photo/repositories";
import { PhotoEntity, PhotoData } from "@/slices/photo/entities";

export type AddPhoto = (data: PhotoData) => Promise<PhotoEntity | null>;
export type AddPhotoSignature = (addPhoto: AddPhotoRepository) => AddPhoto;
export const addPhoto: AddPhotoSignature =
    (addPhotoRepository: AddPhotoRepository) => (data: PhotoData) => {
        return addPhotoRepository.addPhoto(new PhotoEntity(data));
    };
