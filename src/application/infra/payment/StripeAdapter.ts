import { PaymentGateway } from "../contracts";
import { env } from "../config";
import Stripe from "stripe";

export class StripePaymentGateway extends PaymentGateway {
  getChargeByCustomer(data: any): Promise<any> {
    return data;
  }
  private stripe: any;
  constructor(paymentKey: string) {
    super();
    this.stripe = new Stripe(paymentKey, {
      apiVersion: "2025-01-27.acacia",
      typescript: true,
    });
  }
  async createPrice(amount: number): Promise<any> {
    try {
      const price = await this.stripe.prices.create({
        currency: "brl",
        unit_amount: amount,
        recurring: {
          interval: "month",
        },
        product_data: {
          name: "Gold Plan",
        },
      });
      return { price };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createSubscription(data: any): Promise<any> {
    try {
      //const { price } = await this.createPrice(Number(data?.value));
      const subscription = await this.stripe.subscriptions.create({
        customer: data?.customer?.id ?? data?.customer?.correlationID,
        items: [
          {
            price: data?.priceId, //price?.id,
          },
        ],
      });
      return { subscription };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getSubscription(id: string): Promise<any> {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(id);
      return { subscription };
    } catch (e: any) {
      return e?.response?.data;
    }
  }

  async deleteCharge(id: string): Promise<any> {
    try {
      const charge = await this.stripe.paymentIntents.update(id, {
        metadata: { status: "canceled" },
      });
      return { charge, status: "OK" };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getCharge(id: string): Promise<any> {
    try {
      const charge = await this.stripe.paymentIntents.retrieve(id);
      return { charge };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createCharge(data: any): Promise<any> {
    try {
      const charge = await this.stripe.paymentIntents.create({
        amount: Number(data?.value),
        currency: "brl",
        metadata: { metadata: JSON.stringify(data) },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return { charge };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createCustomer(data: any): Promise<any> {
    const { email, description } = data;
    try {
      const params: Stripe.CustomerCreateParams = {
        description,
        email,
      };
      const customer: Stripe.Customer = await this.stripe.customers.create(params);
      return { customer };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getCustomer(id: string): Promise<any> {
    try {
      const customer = await this.stripe.customers.retrieve(id);
      return { customer };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
}

export const makeStripeAdapter = () => {
  return new StripePaymentGateway(env.stripeKeySecret);
};
