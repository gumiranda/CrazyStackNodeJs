export type TaxID = {
  taxID: string;
  type: string;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  taxID: TaxID;
  address?: Address;
};

export type AdditionalInfo = {
  key: string;
  value: string;
};

export type Address = {
  zipcode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
  country: string;
};
