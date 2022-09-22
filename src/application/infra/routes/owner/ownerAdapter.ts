import { adaptRoute } from "@/application/adapters";
import {
  makeAddOwnerController,
  makeLoadOwnerController,
  makeDeleteOwnerController,
  makeUpdateOwnerController,
  makeLoadOwnerByPageController,
} from "@/slices/owner/controllers";

export const addOwnerAdapter = () => adaptRoute(makeAddOwnerController());
export const loadOwnerAdapter = () => adaptRoute(makeLoadOwnerController());
export const loadOwnerByPageAdapter = () =>
  adaptRoute(makeLoadOwnerByPageController());
export const deleteOwnerAdapter = () => adaptRoute(makeDeleteOwnerController());
export const updateOwnerAdapter = () => adaptRoute(makeUpdateOwnerController());
