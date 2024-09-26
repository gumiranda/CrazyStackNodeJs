import { LoadPhotoByPageRepository } from "@/slices/photo/repositories";
import { PhotoPaginated } from "@/slices/photo/entities";
import { Query } from "@/application/types";

export type LoadPhotoByPage = (query: Query) => Promise<PhotoPaginated | null>;
export type LoadPhotoByPageSignature = (
    loadPhotoByPage: LoadPhotoByPageRepository
) => LoadPhotoByPage;
export const loadPhotoByPage: LoadPhotoByPageSignature =
    (loadPhotoByPageRepository: LoadPhotoByPageRepository) =>
    async (query: Query) => {
        return loadPhotoByPageRepository.loadPhotoByPage(query);
    };
