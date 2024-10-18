import { adaptRoute } from "@/application/adapters";
import {
  makeAddTweetlikeController,
  makeLoadTweetlikeController,
  makeDeleteTweetlikeController,
  makeUpdateTweetlikeController,
  makeLoadTweetlikeByPageController,
} from "@/slices/tweetlike/controllers";

export const addTweetlikeAdapter = () => adaptRoute(makeAddTweetlikeController());
export const loadTweetlikeAdapter = () => adaptRoute(makeLoadTweetlikeController());
export const loadTweetlikeByPageAdapter = () =>
  adaptRoute(makeLoadTweetlikeByPageController());
export const deleteTweetlikeAdapter = () => adaptRoute(makeDeleteTweetlikeController());
export const updateTweetlikeAdapter = () => adaptRoute(makeUpdateTweetlikeController());
