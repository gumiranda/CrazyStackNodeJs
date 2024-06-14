import { makeDatabaseInstance } from "@/application/infra";
import { whiteLabel } from "@/application/infra/config/whiteLabel";
import { PhotoRepository } from "@/slices/photo/repositories";
import { loadPhotoByPage, LoadPhotoByPage } from "@/slices/photo/useCases";

export const makeLoadPhotoByPageFactory = (): LoadPhotoByPage => {
  const repository = new PhotoRepository(makeDatabaseInstance(whiteLabel.database,"photo"));
  return loadPhotoByPage(repository);
};
