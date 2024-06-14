import { Query } from "@/application/types";
import { PhotoData } from "@/slices/photo/entities";

export interface UpdatePhotoRepository {
    updatePhoto(query: Query, data: PhotoData): Promise<PhotoData | null>;
}
