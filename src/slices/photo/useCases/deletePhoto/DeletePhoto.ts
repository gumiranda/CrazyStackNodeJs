import { DeletePhotoRepository } from "@/slices/photo/repositories";
import { PhotoData } from "@/slices/photo/entities";
import { Query } from "@/application/types";
import { UploadProvider } from "@/application/infra/storage/contracts/UploadProvider";

export type DeletePhoto = (query: Query) => Promise<PhotoData | null>;
export type DeletePhotoSignature = (
  deletePhoto: DeletePhotoRepository,
  uploadPhotoProvider: UploadProvider
) => DeletePhoto;
export const deletePhoto: DeletePhotoSignature =
  (deletePhotoRepository: DeletePhotoRepository, uploadPhotoProvider: UploadProvider) =>
  async (query: Query) => {
    await uploadPhotoProvider.delete({ fileName: query.fields.key });
    return deletePhotoRepository.deletePhoto(query);
  };
