import { CarEntity } from "./CarEntity";
import MockDate from "mockdate";

export const fakeCarEntity = {
  _id: "123",
  createdById: "123",
  brand: "Audi",
  name: "RS 5 Coupé",
  about:
    "O carro ainda tem sistema de tração nas quatro rodas Quattro com diferencial traseiro esportivo de série. De acordo com a Audi, ele faz o mesmo em 3,8 segundos na Sportback.",
  rent: {
    period: "Ao dia",
    price: 120,
  },
  fuel_type: "electric",
  speed: "250km/h",
  acceleration: "3.8s",
  force: "800 HP",
  gas: "Elétrico",
  exchange: "Auto",
  people: "5 pessoas",
  thumbnail:
    "https://storage.googleapis.com/golden-wind/ignite/react-native/thumbnails/1.png",
  photos: [
    "https://storage.googleapis.com/golden-wind/ignite/react-native/images/1.png",
    "https://storage.googleapis.com/golden-wind/ignite/react-native/images/2.png",
    "https://storage.googleapis.com/golden-wind/ignite/react-native/images/3.png",
  ],
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const fakeCarPaginated = {
  total: 11,
  cars: [
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
    fakeCarEntity,
  ],
};

describe("Car", () => {
  beforeAll(async () => {
    MockDate.set(new Date());
  });
  afterAll(async () => {
    MockDate.reset();
  });
  it("can be created", () => {
    const obj = new CarEntity(fakeCarEntity);
    expect(obj).toBeTruthy();
    expect(obj).toEqual({
      ...fakeCarEntity,
      _id: undefined,
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
});
