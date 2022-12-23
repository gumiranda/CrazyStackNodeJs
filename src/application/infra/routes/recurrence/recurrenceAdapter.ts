import { adaptRoute } from "@/application/adapters";
import {
  makeAddRecurrenceController,
  makeLoadRecurrenceController,
  makeDeleteRecurrenceController,
  makeUpdateRecurrenceController,
  makeLoadRecurrenceByPageController,
} from "@/slices/recurrence/controllers";

export const addRecurrenceAdapter = () => adaptRoute(makeAddRecurrenceController());
export const loadRecurrenceAdapter = () => adaptRoute(makeLoadRecurrenceController());
export const loadRecurrenceByPageAdapter = () =>
  adaptRoute(makeLoadRecurrenceByPageController());
export const deleteRecurrenceAdapter = () => adaptRoute(makeDeleteRecurrenceController());
export const updateRecurrenceAdapter = () => adaptRoute(makeUpdateRecurrenceController());
