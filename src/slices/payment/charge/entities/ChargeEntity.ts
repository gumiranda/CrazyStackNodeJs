import { AdditionalInfo, Customer } from "../../paymentTypes";

export type ChargeData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  customer: Customer;
  value: number;
  comment: string;
  correlationID: string;
  paymentLinkID: string;
  paymentLinkUrl: string;
  qrCodeImage: string;
  expiresIn: number;
  expiresDate: string;
  brCode: string;
  additionalInfo: AdditionalInfo[];
};

export type ChargePaginated = {
  charges: ChargeData[];
  total: number;
};

export class ChargeEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  customer: Customer;
  value: number;
  comment: string;
  correlationID: string;
  paymentLinkID: string;
  paymentLinkUrl: string;
  qrCodeImage: string;
  expiresIn: number;
  expiresDate: string;
  brCode: string;
  additionalInfo: AdditionalInfo[];
  constructor(data: ChargeData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.status = data.status;
    this.customer = data.customer;
    this.value = data.value;
    this.comment = data.comment;
    this.correlationID = data.correlationID;
    this.paymentLinkID = data.paymentLinkID;
    this.paymentLinkUrl = data.paymentLinkUrl;
    this.qrCodeImage = data.qrCodeImage;
    this.expiresIn = data.expiresIn;
    this.expiresDate = data.expiresDate;
    this.brCode = data.brCode;
    this.additionalInfo = data.additionalInfo;
  }
}
