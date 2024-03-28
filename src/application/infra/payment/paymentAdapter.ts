import { makePagarmeAdapter } from "./PagarmeAdapter";
import { makeStripeAdapter } from "./StripeAdapter";
import { makeWooviAdapter } from "./WooviAdapter";

export const makePaymentAdapter = (gateway = "woovi") => {
  return adapters[gateway]();
};

const adapters: any = {
  pagarme: makePagarmeAdapter,
  stripe: makeStripeAdapter,
  woovi: makeWooviAdapter,
};
