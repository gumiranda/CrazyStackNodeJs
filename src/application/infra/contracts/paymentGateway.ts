export abstract class PaymentGateway {
  abstract createCharge(data: any): Promise<any>;
  abstract createSubscription(data: any): Promise<any>;
  abstract getSubscription(data: any): Promise<any>;
  abstract createCustomer(data: any): Promise<any>;
  abstract getCustomer(data: any): Promise<any>;
}
