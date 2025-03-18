import { adaptRoute } from "@/application/adapters";
import {
  makeAddFollowController,
  makeLoadFollowController,
  makeDeleteFollowController,
  makeUpdateFollowController,
  makeLoadFollowByPageController,
} from "@/slices/social-network/follow/controllers";

export const addFollowAdapter = () => adaptRoute(makeAddFollowController());
export const loadFollowAdapter = () => adaptRoute(makeLoadFollowController());
export const loadFollowByPageAdapter = () => adaptRoute(makeLoadFollowByPageController());
export const deleteFollowAdapter = () => adaptRoute(makeDeleteFollowController());
export const updateFollowAdapter = () => adaptRoute(makeUpdateFollowController());
