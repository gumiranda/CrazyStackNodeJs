import { adaptRoute } from "@/application/adapters";
import {
  makeLoadTweetlikeController,
  makeDeleteTweetlikeController,
  makeUpdateTweetlikeController,
  makeLoadTweetlikeByPageController,
  makeToggleTweetlikeController,
} from "@/slices/social-network/tweetlike/controllers";

export const toggleTweetlikeAdapter = () => adaptRoute(makeToggleTweetlikeController());
export const loadTweetlikeAdapter = () => adaptRoute(makeLoadTweetlikeController());
export const loadTweetlikeByPageAdapter = () =>
  adaptRoute(makeLoadTweetlikeByPageController());
export const deleteTweetlikeAdapter = () => adaptRoute(makeDeleteTweetlikeController());
export const updateTweetlikeAdapter = () => adaptRoute(makeUpdateTweetlikeController());
