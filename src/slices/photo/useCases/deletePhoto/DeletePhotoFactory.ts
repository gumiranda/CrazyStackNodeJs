import { env, makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PhotoRepository } from "@/slices/photo/repositories";
import { deletePhoto, DeletePhoto } from "@/slices/photo/useCases";
import { makeUploadProvider } from "@/application/infra/storage/storageFactory";

export const makeDeletePhotoFactory = (): DeletePhoto => {
  const repository = new PhotoRepository(
    makeDatabaseInstance(whiteLabel.database, "photo")
  );
  return deletePhoto(repository, makeUploadProvider(env.uploadProvider));
};
