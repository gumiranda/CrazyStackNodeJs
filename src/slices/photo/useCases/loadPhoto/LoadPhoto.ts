import { LoadPhotoRepository, UpdatePhotoRepository } from "@/slices/photo/repositories";
import { PhotoData } from "@/slices/photo/entities";
import { Query } from "@/application/types";
import { UploadProvider } from "@/application/infra/storage/contracts/UploadProvider";
import { calculateExpiration } from "@/application/adapters/upload-photo-adapter";

export type LoadPhoto = (query: Query) => Promise<PhotoData | null>;
export type LoadPhotoSignature = (
  loadPhoto: LoadPhotoRepository & UpdatePhotoRepository,
  uploadPhotoProvider: UploadProvider
) => LoadPhoto;
export const loadPhoto: LoadPhotoSignature =
  (
    photoRepository: LoadPhotoRepository & UpdatePhotoRepository,
    uploadPhotoProvider: UploadProvider
  ) =>
  async (query: Query) => {
    const photo = await photoRepository.loadPhoto(query);
    if (photo && new Date(photo?.expiresIn as Date).getTime() < new Date().getTime()) {
      const newurl = await uploadPhotoProvider.getSignedUrl(
        photo.key,
        photo?.expiresInSeconds ?? 60
      );
      const photoUploaded = await photoRepository.updatePhoto(
        {
          fields: { _id: photo._id },
        },
        {
          url: newurl,
          key: photo.key,
          expiresIn: calculateExpiration(photo?.expiresInSeconds ?? 60),
          provider: photo.provider,
        }
      );
      return photoUploaded;
    }
    return photo;
  };
