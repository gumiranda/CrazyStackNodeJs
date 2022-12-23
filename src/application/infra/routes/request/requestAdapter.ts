import { adaptRoute } from "@/application/adapters";
import {
  makeAddRequestController,
  makeLoadRequestController,
  makeDeleteRequestController,
  makeUpdateRequestController,
  makeLoadRequestByPageController,
} from "@/slices/request/controllers";

export const addRequestAdapter = () => adaptRoute(makeAddRequestController());
export const loadRequestAdapter = () => adaptRoute(makeLoadRequestController());
export const loadRequestByPageAdapter = () =>
  adaptRoute(makeLoadRequestByPageController());
export const deleteRequestAdapter = () => adaptRoute(makeDeleteRequestController());
export const updateRequestAdapter = () => adaptRoute(makeUpdateRequestController());
