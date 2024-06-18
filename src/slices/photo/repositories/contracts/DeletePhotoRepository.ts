import { Query } from "@/application/types";
import { PhotoData } from "@/slices/photo/entities";

export interface DeletePhotoRepository {
    deletePhoto(query: Query): Promise<PhotoData | null>;
}
