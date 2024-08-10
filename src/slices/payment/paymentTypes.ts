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
export type PagarmeOrder = {
  customer_id: string;
  items: {
    amount: string;
    description: string;
    quantity: string;
    code: string;
  }[];
  closed: string;
  payments: {
    credit_card: {
      operation_type: string;
      installments: string;
      card: {
        number: string;
        holder_name: string;
        holder_document: string;
        exp_month: string;
        exp_year: string;
        cvv: string;
        billing_address_id: string;
        brand: string;
      };
      statement_descriptor: string;
    };
    payment_method: string;
    amount: string;
  }[];
};
export type PagarmeSubscription = {
  currency: string;
  start_at: string;
  interval: string;
  minimum_price: string;
  billing_type: string;
  installments: string;
  description: string;
  card: {
    number: string;
    holder_name: string;
    holder_document: string;
    exp_month: string;
    exp_year: string;
    cvv: string;
    billing_address_id: string;
    brand: string;
  };
  quantity: string;
  pricing_scheme: {
    scheme_type: string;
    price: string;
  };
  statement_descriptor: string;
  customer_id: string;
  payment_method: string;
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
