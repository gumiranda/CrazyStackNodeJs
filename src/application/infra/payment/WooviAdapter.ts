import axios from "axios";
import { PaymentGateway } from "../contracts";
import { env } from "../config";

export class WooviPaymentGateway extends PaymentGateway {
  private apiKey: string;
  constructor() {
    super();
    this.apiKey = env.paymentKey;
  }
  async createCharge(data: any): Promise<any> {
    const { correlationId, value, comment } = data;
    try {
      const { data } = await axios.post(
        "https://api.openpix.com.br/api/v1/charge?return_existing=true",
        { correlationId, value, comment },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "content-type": "application/json",
          },
        }
      );
      return data;
    } catch (e: any) {
      return e?.response?.data;
    }
  }
  async createSubscription(data: any): Promise<any> {}
  async getSubscription(data: any): Promise<any> {}
  async createCustomer(data: any): Promise<any> {}
  async getCustomer(data: any): Promise<any> {}
}
