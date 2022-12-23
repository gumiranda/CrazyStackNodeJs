import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddRideController } from "./addRideController";
import { fakeRideEntity } from "@/slices/ride/entities/RideEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddRideController", () => {
  let testInstance: AddRideController;
  let addRide: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addRide = jest.fn();
    addRide.mockResolvedValue({
      ...fakeRideEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddRideController(validation, addRide);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakeRideEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakeRideEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addRide with correct params", async () => {
    const result = await testInstance.execute({
      body: fakeRideEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakeRideEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addRide).toHaveBeenCalledWith({
      ...fakeRideEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addRide).toHaveBeenCalledTimes(1);
  });
  test("should throws if addRide throw", async () => {
    addRide.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakeRideEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakeRideEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
