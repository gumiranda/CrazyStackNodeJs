import { makePagarmeAdapter } from "./PagarmeAdapter";
import { makeStripeAdapter } from "./StripeAdapter";
import { makeWooviAdapter } from "./WooviAdapter";

export const makePaymentAdapter = (gateway = "woovi") => {
  if (gateway === "pagarme") {
    return makePagarmeAdapter();
  }
  if (gateway === "stripe") {
    return makeStripeAdapter();
  }
  return makeWooviAdapter();
};
