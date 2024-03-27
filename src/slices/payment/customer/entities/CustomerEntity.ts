export type TaxID = {
  taxID: string;
  type: string;
};
export type CustomerData = {
  _id?: string;
  createdById: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
} & Customer;

export type Customer = {
  name: string;
  email: string;
  phone: string;
  taxID: TaxID;
};
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
  constructor(data: CustomerData) {
    this.createdById = data.createdById;
    this.name = data.name;
    this.active = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.email = data.email;
    this.phone = data.phone;
    this.taxID = data.taxID;
  }
}
