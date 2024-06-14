import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PhotoRepository } from "@/slices/photo/repositories";
import { deletePhoto, DeletePhoto } from "@/slices/photo/useCases";

export const makeDeletePhotoFactory = (): DeletePhoto => {
  const repository = new PhotoRepository(makeDatabaseInstance(whiteLabel.database,"photo"));
  return deletePhoto(repository);
};
