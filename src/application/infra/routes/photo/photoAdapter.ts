import { adaptRoute } from "@/application/adapters";
import {
  makeAddPhotoController,
  makeLoadPhotoController,
  makeDeletePhotoController,
  makeUpdatePhotoController,
  makeLoadPhotoByPageController,
} from "@/slices/photo/controllers";

export const addPhotoAdapter = () => adaptRoute(makeAddPhotoController());
export const loadPhotoAdapter = () => adaptRoute(makeLoadPhotoController());
export const loadPhotoByPageAdapter = () =>
  adaptRoute(makeLoadPhotoByPageController());
export const deletePhotoAdapter = () => adaptRoute(makeDeletePhotoController());
export const updatePhotoAdapter = () => adaptRoute(makeUpdatePhotoController());
