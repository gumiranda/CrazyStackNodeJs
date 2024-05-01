export abstract class PaymentGateway {
  abstract createCharge(data: any): Promise<any>;
  abstract deleteCharge(id: string): Promise<any>;
  abstract getCharge(id: string): Promise<any>;
  abstract createSubscription(data: any): Promise<any>;
  abstract getSubscription(data: any): Promise<any>;
  abstract createCustomer(data: any): Promise<any>;
  abstract getCustomer(data: any): Promise<any>;
  abstract getChargeByCustomer(data: any): Promise<any>;
}
