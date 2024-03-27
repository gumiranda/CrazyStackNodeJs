import { Address, Customer, TaxID } from "../../paymentTypes";

export type CustomerData = {
  _id?: string;
  createdById: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  cpf?: string;
  correlationID?: string;
} & Customer;

export type CustomerPaginated = {
  customers: CustomerData[];
  total: number;
};

export class CustomerEntity {
  createdById: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  email: string;
  phone: string;
  taxID: TaxID;
  address?: Address;
  cpf?: string;
  correlationID?: string;

  constructor(data: CustomerData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.email = data.email;
    this.phone = data.phone;
    this.taxID = data.taxID;
    this.address = data.address;
    this.cpf = data.cpf;
    this.correlationID = data.correlationID;
  }
}
