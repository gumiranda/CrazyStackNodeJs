import { Repository } from "@/application/infra/contracts/repository";
import { PhotoData, PhotoPaginated } from "@/slices/photo/entities";
import {
    AddPhotoRepository,
    DeletePhotoRepository,
    LoadPhotoByPageRepository,
    LoadPhotoRepository,
    UpdatePhotoRepository,
} from "./contracts";
import { Query } from "@/application/types";
export class PhotoRepository
    implements
        AddPhotoRepository,
        DeletePhotoRepository,
        LoadPhotoByPageRepository,
        LoadPhotoRepository,
        UpdatePhotoRepository
{
    constructor(private readonly repository: Repository) {}
    async addPhoto(photo: PhotoData): Promise<PhotoData | null> {
        return this.repository.add(photo);
    }
    async deletePhoto(query: Query): Promise<PhotoData | null> {
        return this.repository.deleteOne(query?.fields);
    }
    async loadPhotoByPage(query: Query): Promise<PhotoPaginated | null> {
        const photos = await this.repository.getPaginate(
            query?.options?.page ?? 0,
            query?.fields ?? {},
            query?.options?.sort ?? { createdAt: -1 },
            10,
            query?.options?.projection ?? {}
        );
        const total = await this.repository.getCount(query?.fields ?? {});
        return { photos, total };
    }
    async loadPhoto(query: Query): Promise<PhotoData | null> {
        return this.repository.getOne(query?.fields ?? {}, query?.options ?? {});
    }
    async updatePhoto(query: Query, data: PhotoData): Promise<PhotoData | null> {
        return this.repository.update(query?.fields ?? {}, data);
    }
}
