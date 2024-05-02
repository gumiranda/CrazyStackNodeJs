import { TransactionEntity } from "./TransactionEntity";
import MockDate from "mockdate";

export const fakeTransactionEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeTransactionEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  event: "OPENPIX:CHARGE_COMPLETED",
  charge: {
    customer: {
      name: "teste 5",
      email: "testeede@gmail.com",
      phone: "+5534998350144",
      correlationID: "300474a9-ce05-4ec5-a749-f7796c9f5f54",
      taxID: {
        taxID: "85656616010",
        type: "BR:CPF",
      },
    },
    value: 2990,
    comment: "",
    identifier: "b7046b27c4c44bbeb8e0c676ef7d1892",
    correlationID: "662e43ea22c08a3234cb53e9",
    paymentLinkID: "28a0d0f6-c6b9-4a3a-963e-0d8b3d56caed",
    transactionID: "b7046b27c4c44bbeb8e0c676ef7d1892",
    status: "COMPLETED",
    additionalInfo: [],
    discount: 0,
    valueWithDiscount: 2990,
    expiresDate: "2024-05-28T12:41:14.107Z",
    type: "DYNAMIC",
    createdAt: "2024-04-28T12:41:14.127Z",
    updatedAt: "2024-04-28T12:42:46.240Z",
    paidAt: "2024-04-28T12:42:46.208Z",
    payer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+551234567890",
      address: {
        zipcode: "12345678",
        street: "Rua Exemplo",
        number: "123",
        neighborhood: "Bairro Exemplo",
        city: "Cidade Exemplo",
        state: "Estado Exemplo",
        complement: "Complemento Exemplo",
      },
      taxID: {
        taxID: "85656616010",
        type: "BR:CPF",
      },
      correlationID: "f5490a42-f1ec-4a4a-8bc7-255f770c06a5",
    },
    brCode:
      "00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/b7046b27c4c44bbeb8e0cfssffddfs005303986540529.905802BR5918GUMIRANDA_SISTEMAS6009Sao_Paulo62290525b7046b27c4c44bbeb8e0c676e6304F099",
    expiresIn: 2592000,
    pixKey: "0801cfe8-c950-4b4d-b30a-f7099f7100a4",
    paymentLinkUrl: "https://openpix.com.br/pay/28a0dffsdfdsa-963e-0d8b3d56caed",
    qrCodeImage:
      "https://api.openpix.com.br/openpix/charge/brcode/image/fsdsdfsd0f6-c6b9-4a3a-963e-0d8b3d56caed.png",
    globalID: "Q2hhcmdlOjY2MmU0M2VhMjJjMDhhMzIzNGNiNTNmOQ==",
  },
  pix: {
    customer: {
      name: "teste 5",
      email: "testeede@gmail.com",
      phone: "+5534998350144",
      correlationID: "300474a9-ce05-4ec5-a749-f7796c9f5f54",
    },
    payer: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+551234567890",
      address: {
        zipcode: "12345678",
        street: "Rua Exemplo",
        number: "123",
        neighborhood: "Bairro Exemplo",
        city: "Cidade Exemplo",
        state: "Estado Exemplo",
        complement: "Complemento Exemplo",
        country: "BR",
        location: {
          coordinates: [],
        },
        _id: "660098ee45b5deb249028279",
      },
      taxID: {
        taxID: "85656616010",
        type: "BR:CPF",
      },
      correlationID: "f5490a42-f1ec-4a4a-8bc7-255f770c06a5",
    },
    charge: {
      customer: {
        name: "teste 5",
        email: "testeede@gmail.com",
        phone: "+5534998350144",
        correlationID: "300474a9-ce05-4ec5-a749-f7796c9f5f54",
      },
      value: 2990,
      comment: "",
      identifier: "b7046b27c4c44bbeb8e0c676ef7d1892",
      correlationID: "662e43ea22c08a3234cb53e9",
      paymentLinkID: "28a0d0f6-c6b9-4a3a-963e-0d8b3d56caed",
      transactionID: "b7046b27c4c44bbeb8e0c676ef7d1892",
      status: "COMPLETED",
      additionalInfo: [],
      fee: 50,
      discount: 0,
      valueWithDiscount: 2990,
      expiresDate: "2024-05-28T12:41:14.107Z",
      type: "DYNAMIC",
      createdAt: "2024-04-28T12:41:14.127Z",
      updatedAt: "2024-04-28T12:42:46.240Z",
      paidAt: "2024-04-28T12:42:46.208Z",
      payer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+551234567890",
        address: {
          zipcode: "12345678",
          street: "Rua Exemplo",
          number: "123",
          neighborhood: "Bairro Exemplo",
          city: "Cidade Exemplo",
          state: "Estado Exemplo",
          complement: "Complemento Exemplo",
        },
        taxID: {
          taxID: "85656616010",
          type: "BR:CPF",
        },
        correlationID: "f5490a42-f1ec-4a4a-8bc7-255f770c06a5",
      },
      brCode:
        "00020101021226950014br.gov.bcb.pix2573api.openpix.com.br/api/testaccount/qr/v1/b7046b27c4c44bgsfdgffdgdfg00005303986540529.905802BR5918GUMIRANDA_SISTEMAS6009Sao_Paulo62290525b7046b27c4c44bbeb8e0c676e6304F099",
      subscription: {
        customer: {
          name: "teste 5",
          email: "testeede@gmail.com",
          phone: "+5534998350144",
          correlationID: "300474a9-ce05-4ec5-a749-f7796c9f5f54",
        },
        dayGenerateCharge: 28,
        value: 2990,
        status: "ACTIVE",
        correlationID: "16b5cc8e-4e03-454b-ad7e-34fb6c3aab1a",
        globalID: "UGF5bWVudFN1YnNjcmlwdsfsffsdfdszRjYjUzZTQ=",
      },
      expiresIn: 2592000,
      pixKey: "0801cfe8-c950-4b4d-b30a-f7099f7100a4",
      paymentLinkUrl: "https://openpix.com.br/pay/28a0d0f6-c6b9-4a3a-963e-0d8b3d56caed",
      qrCodeImage:
        "https://api.openpix.com.br/openpix/charge/brcode/image/28a0d0f6-c6b9-4a3a-963e-0d8b3d56caed.png",
      globalID: "Q2hhcmdlOjY2MmU0M2VhMjJdsdsffdsdsfTNmOQ==",
    },
    value: 2990,
    time: "2024-04-28T12:42:46.208Z",
    endToEndId: "Eb62576ffbb9945c6962cf0337f6c1a21",
    transactionID: "b7046b27c4c44bbeb8e0c676ef7d1892",
    infoPagador: "OpenPix testing",
    type: "PAYMENT",
    createdAt: "2024-04-28T12:42:46.209Z",
    globalID: "UGl4VHJhbnNhY3RpbsffsdfdsdfsU2MzEyNTliZmI3",
  },
  company: {
    id: "65fd8ffdsfsddfsdfsc4",
    name: "dsfsfddfsdfsfds",
    taxID: "432432342432423423",
  },
  account: {},
};
export const fakeTransactionPaginated = {
  total: 11,
  transactions: [
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
    fakeTransactionEntity,
  ],
};

describe("Transaction", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new TransactionEntity(fakeTransactionEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeTransactionEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
