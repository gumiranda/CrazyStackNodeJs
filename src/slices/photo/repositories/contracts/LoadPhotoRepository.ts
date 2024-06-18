import { Query } from "@/application/types";
import { PhotoData } from "@/slices/photo/entities";

export interface LoadPhotoRepository {
    loadPhoto(query: Query): Promise<PhotoData | null>;
}
