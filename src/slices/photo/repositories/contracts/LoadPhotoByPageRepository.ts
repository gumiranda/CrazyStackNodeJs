import { Query } from "@/application/types";
import { PhotoPaginated } from "@/slices/photo/entities";

export interface LoadPhotoByPageRepository {
    loadPhotoByPage(query: Query): Promise<PhotoPaginated | null>;
}
