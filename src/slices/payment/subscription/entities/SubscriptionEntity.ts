import { Customer } from "../../paymentTypes";

export type SubscriptionData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  customer: Customer;
  value: string;
  comment: string;
  additionalInfo: any[];
  dayGenerateCharge: string;
  globalID: string;
  gatewayDetails?: any;
};

export type SubscriptionPaginated = {
  subscriptions: SubscriptionData[];
  total: number;
};

export class SubscriptionEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  customer: Customer;
  value: string;
  comment: string;
  additionalInfo: any[];
  dayGenerateCharge: string;
  globalID: string;
  gatewayDetails?: any;

  constructor(data: SubscriptionData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.customer = data.customer;
    this.value = data.value;
    this.comment = data.comment;
    this.additionalInfo = data.additionalInfo;
    this.dayGenerateCharge = data.dayGenerateCharge;
    this.globalID = data.globalID;
    this.gatewayDetails = data.gatewayDetails;
  }
}
