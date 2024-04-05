import { PaymentGateway } from "../contracts";
import { makePagarmeAdapter } from "./PagarmeAdapter";
import { makeStripeAdapter } from "./StripeAdapter";
import { makeWooviAdapter } from "./WooviAdapter";

export const makePaymentAdapter = (gateway: PaymentProvider): PaymentGateway => {
  return adapters[gateway]();
};

const adapters = {
  pagarme: makePagarmeAdapter,
  stripe: makeStripeAdapter,
  woovi: makeWooviAdapter,
} as const;

type PaymentProvider = keyof typeof adapters;
