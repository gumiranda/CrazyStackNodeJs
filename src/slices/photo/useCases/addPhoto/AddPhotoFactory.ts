import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PhotoRepository } from "@/slices/photo/repositories";
import { addPhoto, AddPhoto } from "@/slices/photo/useCases";

export const makeAddPhotoFactory = (): AddPhoto => {
  const repository = new PhotoRepository(makeDatabaseInstance(whiteLabel.database,"photo"));
  return addPhoto(repository);
};
