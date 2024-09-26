import { PhotoData } from "@/slices/photo/entities";

export interface AddPhotoRepository {
    addPhoto(photo: PhotoData): Promise<PhotoData | null>;
}
