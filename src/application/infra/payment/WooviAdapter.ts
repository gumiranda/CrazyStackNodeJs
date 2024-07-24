import axios from "axios";
import { PaymentGateway } from "../contracts";
import { env } from "../config";

export class WooviPaymentGateway extends PaymentGateway {
  private apiKey: string;
  constructor(paymentKey: string) {
    super();
    this.apiKey = paymentKey;
  }
  async deleteCharge(id: string): Promise<any> {
    try {
      const response = await axios.delete(
        `https://api.openpix.com.br/api/v1/charge/${id}`,
        {
          headers: {
            Authorization: this.apiKey,
          },
        }
      );
      return response?.data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getCharge(id: string): Promise<any> {
    try {
      const response = await axios.get(`https://api.openpix.com.br/api/v1/charge/${id}`, {
        headers: {
          Authorization: this.apiKey,
          "content-type": "application/json",
        },
      });
      return response?.data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createCharge(data: any): Promise<any> {
    const { correlationID, value, comment } = data;
    try {
      const { data } = await axios.post(
        "https://api.openpix.com.br/api/v1/charge?return_existing=true",
        { correlationID, value, comment },
        {
          headers: {
            Authorization: this.apiKey,
            "content-type": "application/json",
          },
        }
      );
      return data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createSubscription(body: any): Promise<any> {
    try {
      const { data } = await axios.post(
        "https://api.openpix.com.br/api/v1/subscriptions",
        body,
        {
          headers: {
            Authorization: this.apiKey,
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
        `https://api.openpix.com.br/api/v1/subscriptions/${id}`,
        {
          headers: {
            Authorization: this.apiKey,
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
        "https://api.openpix.com.br/api/v1/customer",
        body,
        {
          headers: {
            Authorization: this.apiKey,
            "content-type": "application/json",
          },
        }
      );
      return data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async getCustomer(id: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.openpix.com.br/api/v1/customer/${id}`,
        {
          headers: {
            Authorization: this.apiKey,
            "content-type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
}
export const makeWooviAdapter = () => {
  return new WooviPaymentGateway(env.paymentKey);
};
