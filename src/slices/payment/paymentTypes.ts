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
export type PagarmeCustomer = {
  phones: {
    home_phone: any;
    mobile_phone: any;
  };
  birthdate: string;
  gender: "male" | "female";
  type: "individual" | "company";
  document_type: "CPF" | "CNPJ" | "PASSPORT";
  document: string;
  code: string;
  address: AddressPagarme;
  metadata: string;
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
export type AddressPagarme = {
  zip_code: string;
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  country: string;
};
