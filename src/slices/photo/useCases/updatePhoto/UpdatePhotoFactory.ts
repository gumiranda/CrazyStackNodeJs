import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PhotoRepository } from "@/slices/photo/repositories";
import { updatePhoto, UpdatePhoto } from "@/slices/photo/useCases";

export const makeUpdatePhotoFactory = (): UpdatePhoto => {
  const repository = new PhotoRepository(makeDatabaseInstance(whiteLabel.database,"photo"));
  return updatePhoto(repository);
};
