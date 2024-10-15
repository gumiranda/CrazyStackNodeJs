import { adaptRoute } from "@/application/adapters";
import {
  makeAddTweetController,
  makeLoadTweetController,
  makeDeleteTweetController,
  makeUpdateTweetController,
  makeLoadTweetByPageController,
} from "@/slices/tweet/controllers";

export const addTweetAdapter = () => adaptRoute(makeAddTweetController());
export const loadTweetAdapter = () => adaptRoute(makeLoadTweetController());
export const loadTweetByPageAdapter = () =>
  adaptRoute(makeLoadTweetByPageController());
export const deleteTweetAdapter = () => adaptRoute(makeDeleteTweetController());
export const updateTweetAdapter = () => adaptRoute(makeUpdateTweetController());
