import { makeWooviAdapter } from "./WooviAdapter";

export const makePaymentAdapter = (gateway = "woovi") => {
  if (gateway === "woovi") {
    return makeWooviAdapter();
  }
  return makeWooviAdapter();
};
