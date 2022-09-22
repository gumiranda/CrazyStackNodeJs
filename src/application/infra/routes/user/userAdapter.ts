import { adaptRoute } from "@/application/adapters";
import {
  makeAddUserController,
  makeLoadUserController,
  makeDeleteUserController,
  makeUpdateUserController,
  makeLoadUserByPageController,
} from "@/slices/user/controllers";

export const addUserAdapter = () => adaptRoute(makeAddUserController());
export const loadUserAdapter = () => adaptRoute(makeLoadUserController());
export const loadUserByPageAdapter = () =>
  adaptRoute(makeLoadUserByPageController());
export const deleteUserAdapter = () => adaptRoute(makeDeleteUserController());
export const updateUserAdapter = () => adaptRoute(makeUpdateUserController());
