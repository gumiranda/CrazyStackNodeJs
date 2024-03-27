import { PaymentGateway } from "../contracts";
import { env } from "../config";
import Stripe from "stripe";

export class StripePaymentGateway extends PaymentGateway {
  private stripe: any;
  constructor(paymentKey: string) {
    super();
    this.stripe = new Stripe(paymentKey, {
      apiVersion: "2023-10-16",
      typescript: true,
    });
  }
  async createSubscription(data: any): Promise<any> {
    try {
      return data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getSubscription(id: string): Promise<any> {
    try {
    } catch (e: any) {
      return e?.response?.data;
    }
  }

  async deleteCharge(id: string): Promise<any> {
    try {
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getCharge(id: string): Promise<any> {
    try {
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createCharge(data: any): Promise<any> {
    try {
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
