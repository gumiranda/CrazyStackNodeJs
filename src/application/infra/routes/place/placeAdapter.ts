import { adaptRoute } from "@/application/adapters";
import {
  makeAddPlaceController,
  makeLoadPlaceController,
  makeDeletePlaceController,
  makeUpdatePlaceController,
  makeLoadPlaceByPageController,
} from "@/slices/place/controllers";

export const addPlaceAdapter = () => adaptRoute(makeAddPlaceController());
export const loadPlaceAdapter = () => adaptRoute(makeLoadPlaceController());
export const loadPlaceByPageAdapter = () =>
  adaptRoute(makeLoadPlaceByPageController());
export const deletePlaceAdapter = () => adaptRoute(makeDeletePlaceController());
export const updatePlaceAdapter = () => adaptRoute(makeUpdatePlaceController());
