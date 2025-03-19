import MockDate from "mockdate";
import { badRequest, ok, Validation } from "@/application/helpers";
import { MockProxy, mock } from "jest-mock-extended";
import { AddPlaceController } from "./addPlaceController";
import { fakePlaceEntity } from "@/slices/place/entities/PlaceEntity.spec";
import { Controller } from "@/application/infra/contracts";
import { MissingParamError } from "@/application/errors";
import { fakeUserEntity } from "@/slices/user/entities/UserEntity.spec";

describe("AddPlaceController", () => {
  let testInstance: AddPlaceController;
  let addPlace: jest.Mock;
  let validation: MockProxy<Validation>;
  beforeAll(async () => {
    MockDate.set(new Date());
    addPlace = jest.fn();
    addPlace.mockResolvedValue({
      ...fakePlaceEntity,
      createdById: fakeUserEntity?._id,
    });
    validation = mock();
    validation.validate.mockResolvedValue([] as never);
  });
  afterAll(() => {
    MockDate.reset();
  });
  beforeEach(() => {
    testInstance = new AddPlaceController(validation, addPlace);
  });
  it("should extends class Controller", async () => {
    expect(testInstance).toBeInstanceOf(Controller);
  });
  test("should call validation with correct params", async () => {
    await testInstance.execute({ body: fakePlaceEntity });
    expect(validation.validate).toHaveBeenCalledWith(fakePlaceEntity);
    expect(validation.validate).toHaveBeenCalledTimes(1);
  });
  test("should call addPlace with correct params", async () => {
    const result = await testInstance.execute({
      body: fakePlaceEntity,
      userId: fakeUserEntity?._id,
    });
    expect(result).toEqual(
      ok({
        ...fakePlaceEntity,
        createdById: fakeUserEntity?._id,
      })
    );
    expect(addPlace).toHaveBeenCalledWith({
      ...fakePlaceEntity,
      createdById: fakeUserEntity?._id,
    });
    expect(addPlace).toHaveBeenCalledTimes(1);
  });
  test("should throws if addPlace throw", async () => {
    addPlace.mockRejectedValueOnce(new Error("error"));
    const result = testInstance.execute({
      body: fakePlaceEntity,
      userId: fakeUserEntity?._id,
    });
    await expect(result).rejects.toThrow(new Error("error"));
  });
  test("should return bad request if i dont pass any required field", async () => {
    validation.validate.mockReturnValueOnce([new MissingParamError("name")]);
    const httpResponse = await testInstance.execute({ body: fakePlaceEntity });
    expect(httpResponse).toEqual(badRequest([new MissingParamError("name")]));
  });
});
