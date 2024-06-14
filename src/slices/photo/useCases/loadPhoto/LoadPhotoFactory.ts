import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PhotoRepository } from "@/slices/photo/repositories";
import { loadPhoto, LoadPhoto } from "@/slices/photo/useCases";

export const makeLoadPhotoFactory = (): LoadPhoto => {
  const repository = new PhotoRepository(makeDatabaseInstance(whiteLabel.database,"photo"));
  return loadPhoto(repository);
};
