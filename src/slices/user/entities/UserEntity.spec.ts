import { UserEntity } from "./UserEntity";
import MockDate from "mockdate";

export const fakeUserEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeUserEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "string",
  role: "client",
  confirmedEmail: true,
  sendedEmail: true,
  password: "string",
  cardId: "string",
  ownerId: "string",
  myOwnerId: "string",
  payDay: "string",
  photoUrl: "string",
  cpf: "string",
  phone: "string",
  coord: { type: "Point", coordinates: [10, 10] },
  distance: 1,
  appointmentsTotal: 1,
  plan: "string",
  cnpj: "string",
  city: "string",
  uf: "string",
  address: "string",
  complement: "string",
  photoId: "string",
  cash: false,
  creditcard: false,
  debitcard: false,
  transferbank: false,
  cheque: false,
  pix: false,
  nextPlan: "string",
  addresses: [],
  clientId: "string",
};
export const fakeUserPaginated = {
  total: 11,
  users: [
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
    fakeUserEntity,
  ],
};

describe("User", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new UserEntity(fakeUserEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeUserEntity,
      _id: undefined,
      active: false,
      confirmedEmail: false,
      sendedEmail: false,
      appointmentsTotal: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
