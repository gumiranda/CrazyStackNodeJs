import { ChargeEntity } from "./ChargeEntity";
import MockDate from "mockdate";

export const fakeChargeEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeChargeEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  status: "fakeChargeEntity",
  customer: {
    name: "fakeChargeEntity",
    email: "fakeChargeEntity",
    phone: "fakeChargeEntity",
    taxID: { taxID: "123", type: "fakeChargeEntity" },
  },
  value: 123,
  comment: "fakeChargeEntity",
  correlationID: "fakeChargeEntity",
  paymentLinkID: "fakeChargeEntity",
  paymentLinkUrl: "fakeChargeEntity",
  qrCodeImage: "fakeChargeEntity",
  expiresIn: 123,
  expiresDate: "fakeChargeEntity",
  brCode: "fakeChargeEntity",
  additionalInfo: [{ key: "fakeChargeEntity", value: "fakeChargeEntity" }],
};
export const fakeChargePaginated = {
  total: 11,
  charges: [
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
    fakeChargeEntity,
  ],
};

describe("Charge", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new ChargeEntity(fakeChargeEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeChargeEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
