import { CustomerEntity } from "./CustomerEntity";
import MockDate from "mockdate";

export const fakeCustomerEntity = {
  _id: "123",
  createdById: "123",
  name: "fakeCustomerEntity",
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  email: "fakeCustomerEntity",
  phone: "fakeCustomerEntity",
  taxID: { taxID: "123", type: "fakeCustomerEntity" },
  address: {
    zipcode: "123",
    street: "fakeCustomerEntity",
    number: "123",
    neighborhood: "fakeCustomerEntity",
    city: "fakeCustomerEntity",
    state: "fakeCustomerEntity",
    complement: "fakeCustomerEntity",
    country: "fakeCustomerEntity",
  },
};
export const fakeCustomerPaginated = {
  total: 11,
  customers: [
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
    fakeCustomerEntity,
  ],
};

describe("Customer", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new CustomerEntity(fakeCustomerEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeCustomerEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
