import axios from "axios";
import { PaymentGateway } from "../contracts";
import { env } from "../config";

export class PagarmePaymentGateway extends PaymentGateway {
  private apiKey: string;
  constructor(paymentKey: string) {
    super();
    //this.apiKey = Buffer.from(paymentKey).toString("base64");
    this.apiKey = paymentKey + "="; //coloca ja convertido no env sem os = no final
  }
  async deleteCharge(id: string): Promise<any> {
    try {
      const response = await axios.delete(`https://api.pagar.me/core/v5/charges/${id}`, {
        headers: {
          Authorization: `Basic ${this.apiKey}`,
        },
      });
      return response?.data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getCharge(id: string): Promise<any> {
    try {
      const response = await axios.get(`https://api.pagar.me/core/v5/orders/${id}`, {
        headers: {
          Authorization: `Basic ${this.apiKey}`,
          "content-type": "application/json",
        },
      });
      return { charge: response?.data };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createCharge(data: any): Promise<any> {
    const { pagarmeOrder } = data;
    try {
      const { data } = await axios.post(
        "https://api.pagar.me/core/v5/orders",
        pagarmeOrder,
        {
          headers: {
            Authorization: `Basic ${this.apiKey}`,
            "content-type": "application/json",
          },
        }
      );
      return { charge: data };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createSubscription(body: any): Promise<any> {
    try {
      const { data } = await axios.post(
        "https://api.pagar.me/core/v5/subscriptions",
        body,
        {
          headers: {
            Authorization: `Basic ${this.apiKey}`,
            "content-type": "application/json",
          },
        }
      );
      return data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getSubscription(id: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.pagar.me/core/v5/subscriptions/${id}`,
        {
          headers: {
            Authorization: `Basic ${this.apiKey}`,
            "content-type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createCustomer(body: any): Promise<any> {
    try {
      const { data } = await axios.post(
        "https://api.pagar.me/core/v5/customers",
        body?.pagarmeCustomer,
        {
          headers: {
            Authorization: `Basic ${this.apiKey}`,
            "content-type": "application/json",
          },
        }
      );
      return { customer: data };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getCustomer(id: string): Promise<any> {
    try {
      const response = await axios.get(`https://api.pagar.me/core/v5/customers/${id}`, {
        headers: {
          Authorization: `Basic ${this.apiKey}`,
          "content-type": "application/json",
        },
      });
      return { customer: response?.data };
    } catch (e: any) {
      return e?.response?.data;
    }
  }
}
export const makePagarmeAdapter = () => {
  return new PagarmePaymentGateway(env.pagarmeKeySecret);
};
