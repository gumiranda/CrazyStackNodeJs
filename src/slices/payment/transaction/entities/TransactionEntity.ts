import { Customer } from "../../paymentTypes";

export type TransactionData = {
  _id?: string;
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} & PostData;
export type PostData = {
  event: string;
  charge: ChargeDataPost;
  pix: any;
  company: any;
  account: any;
};
type ChargeDataPost = {
  customer: Customer & { correlationID: string };
  value: number;
  comment: string;
  identifier: string;
  correlationID: string;
  paymentLinkID: string;
  transactionID: string;
  status: string;
  additionalInfo: any[];
  discount: number;
  valueWithDiscount: number;
  expiresDate: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string;
  payer: any; // substitua 'any' pelo tipo correto
  brCode: string;
  expiresIn: number;
  pixKey: string;
  paymentLinkUrl: string;
  qrCodeImage: string;
  globalID: string;
};
export type TransactionPaginated = {
  transactions: TransactionData[];
  total: number;
};

export class TransactionEntity {
  createdById: string;
  name: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  event: string;
  charge: ChargeDataPost;
  pix: any; // substitua 'any' pelo tipo correto
  company: any; // substitua 'any' pelo tipo correto
  account: any; // substitua 'any' pelo tipo correto
  constructor(data: TransactionData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.event = data.event;
    this.charge = data.charge;
    this.pix = data.pix;
    this.company = data.company;
    this.account = data.account;
  }
}
